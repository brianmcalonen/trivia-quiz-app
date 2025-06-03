require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Question = require("../models/Question");

const MONGO_URI = process.env.MONGO_URI;

const DIFFICULTIES = ["easy", "medium", "hard"];
const QUESTIONS_PER_DIFFICULTY = 5;
const MAX_RETRIES = 3;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(categoryId, difficulty, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: QUESTIONS_PER_DIFFICULTY,
          category: categoryId,
          difficulty,
          type: "multiple",
        },
      });
      return response.data.results;
    } catch (err) {
      if (err.response?.status === 429 && attempt < retries) {
        console.warn(`429 Too Many Requests — retrying in ${attempt * 5}s...`);
        await sleep(attempt * 5000);
      } else {
        throw err;
      }
    }
  }
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Category.deleteMany({});
    await Question.deleteMany({});
    console.log("🧹 Cleared existing data");

    const categoriesResponse = await axios.get(
      "https://opentdb.com/api_category.php"
    );
    const categories = categoriesResponse.data.trivia_categories;

    const seededCategories = [];

    for (const category of categories) {
      let allQuestions = [];

      for (const difficulty of DIFFICULTIES) {
        await sleep(3000); // Space out requests
        const questions = await fetchWithRetry(category.id, difficulty);

        if (questions.length < QUESTIONS_PER_DIFFICULTY) {
          console.warn(
            `❌ Skipping ${category.name} — not enough ${difficulty} questions`
          );
          allQuestions = null;
          break;
        }

        allQuestions.push(...questions);
      }

      if (allQuestions) {
        await Category.create(category);
        await Question.insertMany(allQuestions);
        console.log(
          `✅ Seeded ${category.name} with ${allQuestions.length} questions`
        );
        seededCategories.push(category.name);
      }
    }

    console.log(`\n🎉 Done! Seeded ${seededCategories.length} categories`);
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error during seeding:", err.message);
    process.exit(1);
  }
}

seed();
