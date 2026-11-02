const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    quizTitle: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    correct: {
      type: Number,
      required: true,
    },

    wrong: {
      type: Number,
      required: true,
    },

    skipped: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "QuizResult",
  quizResultSchema
);