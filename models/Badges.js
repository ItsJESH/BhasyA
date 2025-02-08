const mongoose = require("mongoose");

const badgesSchema = new mongoose.Schema(
  {
    badgeId: { type: String, unique: true, required: true }, // Developer-defined unique ID
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true }, // Conditions to earn this badge
    photoUrl: { type: String, required: true }, // URL of badge image (stored in cloud or MongoDB)
    totalEarned: { type: Number, default: 0 }, // Total number of users who earned this badge
    earnedBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
        earnedAt: { type: Date, default: Date.now } // Date when the user earned the badge
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Badges", badgesSchema);
