const mongoose = require("mongoose");

const userRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User123" },
    username: {type: String},  // Just for easier lookup
    dailyRecords: {
        type: Map,
        of: {
            clipsWatched: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 }, // in minutes
            badgesEarned: { type: Number, default: 0 },
            examsGiven: { type: Number, default: 0 },
            streakDays: { type: Number, default: 0 }
        },
        default: {}
    },
    overall: {
        totalClips: { type: Number, default: 0 },
        totalTimeSpent: { type: Number, default: 0 },
        totalBadges: { type: Number, default: 0 },
        totalExams: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 }
    }
},{timestamps: true});

module.exports = mongoose.model("UserRecord", userRecordSchema);
