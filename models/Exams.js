const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examId: { type: String, unique: true }, // Developer-defined unique ID
    title: { type: String },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
    totalQuestions: { type: Number },
    score: { type: Number }, // Maximum score for the exam
    questions: [
      {
        Qno: { type: Number },
        Qtitle: { type: String },
        type: { type: String, enum: ["MCQ", "Fill in the Blanks"] },
        options: {
          a: { type: String },
          b: { type: String },
          c: { type: String },
          d: { type: String }
        },
        answer: { type: String }, // Correct answer
        hint1: { type: String },
        hint2: { type: String },
        description: { type: String }, // Explanation for correct answer
        attemptedBy: {
          totalUsers: { type: Number, default: 0 },
          correct: { type: Number, default: 0 },
          wrong: { type: Number, default: 0 },
          skipped: { type: Number, default: 0 }
        }
      }
    ],
    givenBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: { type: String },
        score: { type: Number }, // Score user obtained
        date: { type: Date, default: Date.now } // Date user attempted the exam
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exams", examSchema);
