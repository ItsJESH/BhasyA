const mongoose = require("mongoose");

const userClipsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String }, // Just for easier lookup
    clips:{
        type: Map,
        of: [
            {
                clipId: { type: mongoose.Schema.Types.ObjectId, ref: "Clips", required: true },
                title: { type: String, required: true },
                time: { type: Number, default: 0 },
                watchTime: { type: Number, default: 0 },
                watchAt: { 
                    type: Date, 
                    default: Date.now
                } 
            }
        ],
        default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserClips", userClipsSchema);
