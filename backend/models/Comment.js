const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema({
    userId: {
      type: String,
    },
    postId: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);