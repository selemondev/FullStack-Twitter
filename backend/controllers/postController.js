const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const asyncHandler = require("express-async-handler")

// create a post
const createPost = asyncHandler( async ( req, res ) => {
    const { desc, img } = req.body;

    const post = await PostModel.create({
        desc,
        img,
        userId: req.user.id
    });

    if(post) {
        res.status(201);
        res.json(post)
    } else {
        res.status(400);
        throw new Error(" An error occurred");
    }
});


// update a post
const updatePost = asyncHandler( async ( req, res ) => {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    };

    const user = await UserModel.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("User not found");
    };

    if(post.userId !== user.id) {
        res.status(401);
        throw new Error(" User not authorized")
    };

    const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
});

// delete a post
const deletePost = asyncHandler( async ( req, res ) => {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    };

    const user = await UserModel.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("User not found");
    };

    if(post.userId !== user.id) {
        res.status(401);
        throw new Error(" User not authorized")
    };

    await post.deleteOne();
    res.status(200).json({ id: req.params.id })
});

// get a single post
const getPost = asyncHandler( async ( req, res ) => {
    const post = await PostModel.findById(req.params.id);
    if( !post ) {
        res.status(404);
        throw new Error("Post not found");

    } else {
        res.status(200).json(post)
    }
});


// get posts from the your friends and yourself
const getTimeLinePosts = asyncHandler( async ( req, res ) => {
    try {
        const currentUser = await UserModel.findById(req.params.id);
        const userPosts = await PostModel.find({ userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
          return PostModel.find({ userId: friendId });
        })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
});


// get user's all posts
const userPosts = asyncHandler( async (req, res ) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username});
        const posts = await PostModel.find({ userId: user.id });
        res.status(200).json(posts)
    } catch(error) {
        res.status(500);
        throw new Error(error.message);
    }

});


// get your own posts;
const getMyPosts = asyncHandler( async ( req, res ) => {
    const posts = await PostModel.find({ userId: req.user.id }).sort({"createdAt": -1 });
    res.status(200).json(posts);
});


// get by tags

const getByTag = asyncHandler(async ( req, res ) => {
    const tags = req.query.tags.split(",");
    try {
        const posts = await PostModel.find({ tags: { $in: tags }}).limit(10);
        res.status(200).json(posts);
    } catch(error) {
        res.status(500);
        throw new Error(error.message);
    }
})


// like and unlike a post
const likePost = asyncHandler( async( req, res ) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.likes.includes(req.user.id)) {
            await PostModel.updateOne({ $push: { likes: req.user.id }});
            res.status(200).json("The post has been liked");
        } else {
            await PostModel.updateOne({ $pull: { likes: req.user.id } });
            res.status(200).json("The post has been disliked");
        }
    } catch(error) {
        res.status(500);
        throw new Error(error.message)
    }
})


module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    userPosts,
    getMyPosts,
    getTimeLinePosts,
    likePost,
    getByTag
}
