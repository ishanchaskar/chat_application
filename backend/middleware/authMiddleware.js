const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log("Token received:", token); // Log token
            // console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY); // Log secret key

            if (!process.env.JWT_SECRET_KEY) {
                throw new Error("JWT_SECRET_KEY is not defined");
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log("Decoded token:", decoded); // Log decoded token

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(401);
                throw new Error("Not authorized, user not found");
            }

            next();
        } catch (error) {
            console.error("Token error:", error); // Log error
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("No token, authorization denied");
    }
});

module.exports = { protect };
