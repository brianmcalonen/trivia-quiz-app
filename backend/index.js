require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const categoriesRoutes = require("./routes/categories");
const quizRoutes = require("./routes/quiz");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/categories", categoriesRoutes);
app.use("/api/quiz", quizRoutes);

// connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
