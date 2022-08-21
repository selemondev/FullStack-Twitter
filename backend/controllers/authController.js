const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const registerUser = asyncHandler( async( req, res ) => {
    const { email, username, password } = req.body;

    if( !email || !username || !password) {
        res.status(400)
        throw new Error("Please add all the required fields")
    };

    const userExists = await UserModel.findOne({ email });

    if( userExists) {
        res.status(400);
        throw new Error("User already exists");
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({
        email,
        username,
        password: hashedPassword
    });

    if( user ) {
        res.status(201);
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
});


const loginUser = asyncHandler( async ( req, res ) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if( user && ( await bcrypt.compare(password, user.password))) {
        res.status(200);
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error( "Invalid user credentials")
    }
});

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "2d"
    })
};

module.exports = {
    registerUser,
    loginUser
}