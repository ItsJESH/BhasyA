const User = require("../models/users");
const UserActivity = require("../models/userActivity");
const UserRecord = require("../models/userRecord");

const jwt = require("jsonwebtoken");

exports.logoutUser = async (req, res) => {
    try{
        const decoded = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
        const userId = decoded.userId;
        res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Same settings as when setting the cookie
        sameSite: "strict" // Ensures cookie is only sent from the same site
    });
    let userActivity = await UserActivity.findOne({ userId : userId });
    // Add login activity to activities array
    userActivity.activities.push({
        type: "Logout",
        ip: req.ip,
        device: req.headers["user-agent"],
        cookie: {
            value: req.cookies.jwt,
            expiresAt: new Date(), // 30 days expiration
        },
    });

    // Save the activity in the userActivity collection
    await userActivity.save();
        res.redirect('/login');

    }
        catch(e){
            console.error(e);
        }
}
