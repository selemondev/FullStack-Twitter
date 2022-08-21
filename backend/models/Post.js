const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        max: 100
    },

    img: {
        type: String,
    },

    tags: {
        type: [String],
        default: []
    },

    likes: {
        type: [String],
        default: [],
    },

    dislikes: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Posts", PostSchema)