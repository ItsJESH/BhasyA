const mongoose = require("mongoose");

const userBadgesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true }, // For easy lookup
    badges: [
      {
        badgeId: { type: mongoose.Schema.Types.ObjectId, ref: "Badges", required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        earnedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserBadges", userBadgesSchema);
