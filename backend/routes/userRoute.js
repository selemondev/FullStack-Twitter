const express = require('express');
const router = express.Router();
const { deleteUser, updateUser, searchUser, getUser, getFriends, followUser, unfollowUser } = require('../controllers/userController');
const { protect } = require("../middlewares/authMiddleware");
router.route("/update/:id").put(protect, updateUser);
router.route("/delete/:id").delete(protect, deleteUser);
router.route("/getUser").get(getUser);
router.route("/friends/:id").get(protect, getFriends);
router.route("/follow/:id").put(protect, followUser);
router.route("/unfollow/:id").put(protect, unfollowUser);
router.route("/search").get(searchUser)
module.exports = router;