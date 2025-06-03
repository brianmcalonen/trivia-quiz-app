const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// maps OpenTDB category IDs to their string names in your DB
const CATEGORY_MAP = {
  9: "General Knowledge",
  10: "Entertainment: Books",
  11: "Entertainment: Film",
  12: "Entertainment: Music",
  13: "Entertainment: Musicals & Theatres",
  14: "Entertainment: Television",
  15: "Entertainment: Video Games",
  16: "Entertainment: Board Games",
  17: "Science & Nature",
  18: "Science: Computers",
  19: "Science: Mathematics",
  20: "Mythology",
  21: "Sports",
  22: "Geography",
  23: "History",
  24: "Politics",
  25: "Art",
  26: "Celebrities",
  27: "Animals",
  28: "Vehicles",
  29: "Entertainment: Comics",
  30: "Science: Gadgets",
  31: "Entertainment: Japanese Anime & Manga",
  32: "Entertainment: Cartoon & Animations",
};

// helper to shuffle answer order
function shuffleAnswers(question) {
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  const shuffled = allAnswers.sort(() => Math.random() - 0.5);

  // fallback for both types
  const { correct_answer, ...rest } = question._doc || question;

  return {
    ...rest,
    answers: shuffled,
  };
}

// GET /api/quiz?category=9&difficulty=easy&amount=5
router.get("/", async (req, res) => {
  const { category, difficulty, amount } = req.query;

  const categoryName = CATEGORY_MAP[parseInt(category)];

  try {
    const questions = await Question.aggregate([
      {
        $match: {
          category: categoryName,
          difficulty: difficulty,
        },
      },
      {
        $sample: { size: parseInt(amount) },
      },
    ]);

    const processed = questions.map(shuffleAnswers);
    res.json(processed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quiz questions" });
  }
});

// POST /api/quiz/score
router.post("/score", async (req, res) => {
  const submitted = req.body.answers; // [{ question, answer }]
  try {
    let correctCount = 0;
    const correctAnswers = [];

    for (let item of submitted) {
      const original = await Question.findOne({ question: item.question });
      if (original) {
        if (item.answer === original.correct_answer) {
          correctCount++;
        }
        correctAnswers.push({
          question: item.question,
          correct: original.correct_answer,
        });
      } else {
        console.warn("Question not found:", item.question);
        correctAnswers.push({
          question: item.question,
          correct: null,
        });
      }
    }

    res.json({
      score: correctCount,
      total: submitted.length,
      correctAnswers,
    });
  } catch (err) {
    console.error("Score submission failed:", err);
    res.status(500).json({ error: "Failed to score quiz" });
  }
});

module.exports = router;
