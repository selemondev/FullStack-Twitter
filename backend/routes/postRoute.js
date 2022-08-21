const express = require('express');
const router = express.Router();
const { createPost, deletePost, updatePost, getPost, getByTag, getMyPosts,userPosts, getTimeLinePosts, likePost } = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");
router.route("/create").post(protect, createPost);
router.route("/update/:id").put(protect, updatePost);
router.route("/delete/:id").delete(protect, deletePost);
router.route("/getPost/:id").get(protect, getPost);
router.route("/timelinePost/:id").get(protect, getTimeLinePosts);
router.route("/profile/:username").get(protect, userPosts);
router.route("/myPosts").get(protect, getMyPosts);
router.route("/like/:id").put(protect, likePost);
router.route("/tags").get(getByTag)
module.exports = router;