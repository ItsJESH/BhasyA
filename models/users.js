const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true},
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    DOB: { type: Date, required: true },
    verified: { type: Boolean, default: false }, 
    verificationToken: String,
    userRecordId:{ type: mongoose.Schema.Types.ObjectId, ref: "UserRecord" },
    userActivityId:{type: mongoose.Schema.Types.ObjectId, ref: "UserActivity" },
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
