const express = require('express');
const router = express.Router();
const { addComment, deleteComment, getComments, updateComment } = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");
router.route("/add").post(protect, addComment);
router.route("/update/:id").put(protect, updateComment);
router.route("/delete/:id").delete(protect, deleteComment);
router.route("/get/:postId").get(protect, getComments);
module.exports = router;