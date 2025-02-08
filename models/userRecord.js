const mongoose = require("mongoose");

const userRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: {type: String},  // Just for easier lookup
    dailyRecords: {
        type: Map,
        of: {
            todaysClips: { type: Number, default: 0 },
            todaysExams: { type: Number, default: 0 },
            todaysScore: { type: Number, default: 0 },
            todaysTimeSpent: { type: Number, default: 0 }, // in minutes
            todaysBadges: { type: Number, default: 0 },
            streakDays: { type: Number, default: 0 },
            examsGive: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserExam" }],
            clipsWatch: [{ type: mongoose.Schema.Types.ObjectId,ref: "UserClips" }]
        },
        default: {}
    },
    overall: {
        totalClips: { type: Number, default: 0 },
        totalExams: { type: Number, default: 0 },
        totalScore: { type: Number, default: 0 },
        totalTimeSpent: { type: Number, default: 0 },
        totalBadges: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
    }
},{timestamps: true});

module.exports = mongoose.model("UserRecord", userRecordSchema);
