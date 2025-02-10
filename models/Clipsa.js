const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema(
  {
    clipId: { type: String, unique: true }, // Developer-defined unique ID
    title: { type: String },
    language: { type: String }, // Language of the clip
    duration: { type: Number }, // Duration in seconds
    subtitle1: {
      name: { type: String }, // Name of the first subtitle language
      url: { type: String } // URL of the first subtitle file
    },
    subtitle2: {
      name: { type: String }, // Name of the second subtitle language
      url: { type: String } // URL of the second subtitle file
    },
    clipUrl: { type: String }, // Video URL
    totalViews: { type: Number, default: 0 }, // Total number of times the clip was viewed
    watchBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: { type: String },// Time spent watching in seconds
        date: { type: Date, default: Date.now } // Date of viewing
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clips", clipSchema);
