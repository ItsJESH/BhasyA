const jwt = require("jsonwebtoken");
const UserRecord = require("../models/userRecord"); // Adjust the path as needed

const makeDailyRec = async (req, res, next) => {
    try {
        const userId = jwt.decode(req.cookies.authToken,process.env.JWT_SECRET).userId;
        const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

        let userRecord = await UserRecord.findOne({ userId });

        if (!userRecord) {
            // If no record exists, create a new one
            userRecord = new UserRecord({
                userId,
                username: req.user.username, // Assuming username is available
                dailyRecords: {}
            });
        }

        // Check if today's record exists
        if (!userRecord.dailyRecords.has(today)) {
            userRecord.dailyRecords.set(today, {
                todaysClips: 0,
                todaysExams: 0,
                todaysScore: 0,
                todaysTimeSpent: 0,
                todaysBadges: 0,
                streakDays: 0,
                examsGive: [],
                clipsWatch: []
            });
        }

        await userRecord.save();

        // Attach userRecord to req for further use in the next function
        req.userRecord = userRecord;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = makeDailyRec;
