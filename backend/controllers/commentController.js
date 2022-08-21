const commentModel = require("../models/Comment");
const UserModel = require('../models/User');
const asyncHandler = require("express-async-handler");
const addComment = asyncHandler( async ( req, res ) => {
    const comment = await commentModel.create({
        ...req.body,
        userId: req.user.id
    });

    if(comment) {
        res.status(201);
        res.json(comment)
    }else {
        res.status(400);
        throw new Error(" An error occurred");
    }
});



const updateComment = asyncHandler( async ( req, res ) => {
    const comment = await commentModel.findById(req.params.id);
    if ( !comment ) {
        res.status(404);
        throw new Error("Comment not found ");
    };

    const user = await UserModel.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("Comment not found ");
    };

    if(comment.userId !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    } else {
        const updatedComment = await commentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedComment);
    }
})


const deleteComment = asyncHandler( async ( req, res ) => {
    const comment = await commentModel.findById(req.params.id);
    if(!comment) {
        res.status(404);
        throw new Error("Comment not found ");
    }

    const user = await UserModel.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("User not found")
    };

    if(comment.userId !== user.id) {
        res.status(401);
        throw new Error(" User not authorized");
    };

    await comment.remove();
    res.status(200).json({ id: req.params.id })
});

const getComments = asyncHandler( async ( req, res ) => {
    try {
        const comment = await commentModel.find({ postId: req.params.postId });
        res.status(200).json(comment)
    } catch(error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    addComment,
    deleteComment,
    getComments,
    updateComment
}
