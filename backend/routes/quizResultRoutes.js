const express = require("express");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

// Save a quiz result
router.post("/", async (req, res) => {
  try {
    const {
      userEmail,
      quizTitle,
      score,
      totalMarks,
      correct,
      wrong,
      skipped,
      percentage,
      status,
    } = req.body;

    if (
      !userEmail ||
      !quizTitle ||
      score === undefined ||
      totalMarks === undefined ||
      correct === undefined ||
      wrong === undefined ||
      skipped === undefined ||
      percentage === undefined ||
      !status
    ) {
      return res.status(400).json({
        message: "All result details are required",
      });
    }

    const result = new QuizResult({
      userEmail,
      quizTitle,
      score,
      totalMarks,
      correct,
      wrong,
      skipped,
      percentage,
      status,
    });

    await result.save();

    res.status(201).json({
      message: "Quiz result saved successfully",
      result,
    });
  } catch (error) {
    console.error("Save quiz result error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get all quiz results for one user
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();

    const results = await QuizResult.find({
      userEmail: email,
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (error) {
    console.error("Get quiz results error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;