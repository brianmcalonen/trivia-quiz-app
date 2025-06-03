import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchQuiz } from "../features/quiz/quizSlice";
import {
  setSelectedCategory,
  setDifficulty,
  setAmount,
} from "../features/ui/uiSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector((state) => state.categories.items);
  const selectedCategory = useAppSelector((state) => state.ui.selectedCategory);
  const difficulty = useAppSelector((state) => state.ui.difficulty);
  const amount = useAppSelector((state) => state.ui.amount);

  const handleStartQuiz = () => {
    dispatch(fetchQuiz({ category: selectedCategory, difficulty, amount }));
    navigate("/quiz");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div className="container p-4 rounded" style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Start a Trivia Quiz</h1>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select bg-dark text-light border-secondary"
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Difficulty</label>
          <select
            className="form-select bg-dark text-light border-secondary"
            value={difficulty}
            onChange={(e) => dispatch(setDifficulty(e.target.value))}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Number of Questions</label>
          <input
            type="number"
            min={1}
            max={5}
            className="form-control bg-dark text-light border-secondary"
            value={amount}
            onChange={(e) => dispatch(setAmount(parseInt(e.target.value)))}
          />
        </div>

        <button
          className={`btn btn-primary w-100 ${
            !selectedCategory ? "disabled" : ""
          }`}
          onClick={handleStartQuiz}
          disabled={!selectedCategory}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
