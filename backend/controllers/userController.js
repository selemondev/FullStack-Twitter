const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
// update user
const updateUser = asyncHandler( async ( req, res ) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500);
        throw new Error(err.message)
      }
    }
    try {
      await UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500);
      throw new Error(err.message)
    }
  } else {
    res.status(403);
    throw new Error("You can only update your account")
  }
});
// delete User
const deleteUser = asyncHandler( async ( req, res ) => {
    if ( req.user.id === req.params.id || req.body.isAdmin ) {
        try {
            await UserModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        } catch(err) {
            res.status(500)
            throw new Error(err)
        }
    } else {
        res.status(401);
        throw new Error(" You can only update your account ")
    }
});

// get user
const getUser = asyncHandler( async (req, res ) => {
  const userId = req.query.id;
  const username = req.query.username;
  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

//get friends
const getFriends = asyncHandler( async ( req, res ) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(401);
    throw new Error(err)
  }
});

// follow a user;
const followUser = asyncHandler( async ( req, res ) => {
  if ( req.user.id !== req.params.id ) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.user.id);
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed")
      } else {
        res.status(403);
        throw new Error("You already follow this user")
      }
    } catch(err) {
      res.status(500);
      throw new Error(err.message)
    }
  } else {
      res.status(403);
      throw new Error("You cannot follow yourself")
    }
});


// unfollow a user

const unfollowUser = asyncHandler( async ( req, res ) => {
  if ( req.user.id !== req.params.id ) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.user.id);
      if (user.followers.includes(req.user.id)) {
        await user.updateOne({ $pull: { followers: req.user.id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed")
      } else {
        res.status(403);
        throw new Error("You don't follow this user")
      }
    } catch(err) {
      res.status(500);
      throw new Error(err.message)
    }
  } else {
    res.status(403);
    throw new Error("You cannot unfollow yourself")
  }
});


// search for a user;
const searchUser = asyncHandler( async (req, res ) => {
  const query = req.query.q;
  try {
    const user = await UserModel.find({
      username: { $regex: query, $options: "i"}
    }).limit(20);
    const { password, updatedAt, ...other } = user;
    res.status(200).json(other);
  } catch(error) {
    res.status(500);
    throw new Error(error.message);
  }
})


module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getFriends,
    followUser,
    unfollowUser,
    searchUser
}
