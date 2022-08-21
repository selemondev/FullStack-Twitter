const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User");
const protect = asyncHandler( async (req, res, next) => {
    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decoded.id).select('-password');

        next();
    } else {
        res.status(401);
        throw new Error(" Unauthorized ");
    };

    if(!token) {
        res.status(401);
        throw new Error("No token, not authorized")
    }
});

module.exports = {
    protect
}