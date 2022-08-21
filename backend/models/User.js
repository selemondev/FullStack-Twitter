const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        default: ""
    },

    coverPicture: {
        type: String,
        default: ""
    },

    followers: {
        type: Array,
        default: []
    },

    followings: {
        type: Array,
        default: []
    },

    desc: {
        type: String,
        max: 100
    },

    city: {
        type: String,
        max: 50,
      },

    from: {
        type: String,
        max: 50,
    },

    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);