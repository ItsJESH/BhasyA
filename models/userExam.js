const mongoose = require("mongoose");

const userExamSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String }, // Just for easier lookup
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exams",
        required: true,
      },
    totalScore: { type: Number, required: true },
    score: { type: Number, default: 0 },
    totalQuestion: { type: Number, required: true},
    right: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    skipped: { type: Number, default: 0 },
    timeTaken: { type: Number, required: true }, // Time taken in seconds
    examTime: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserExam", userExamSchema);
