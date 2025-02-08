const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: {type: String},
    activities: [{
        type: {type: String},  // "Login", "Logout", "Password Change", etc.
        timestamp: { type: Date, default: Date.now },
        ip: {type: String},
        device:{type: String},
        cookie: {
            value: {type: String},
            expiresAt: {type: Date},
        }
    }]
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
