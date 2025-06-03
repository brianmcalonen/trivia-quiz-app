import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectAnswer,
  submitQuiz,
  resetQuiz,
} from "../features/quiz/quizSlice";
import { setShowScoreModal } from "../features/ui/uiSlice";
import NoQuizMessage from "../components/NoQuizMessage";
import QuizScore from "../components/QuizScore";

const Quiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const questions = useAppSelector((state) => state.quiz.questions);
  const selectedAnswers = useAppSelector((state) => state.quiz.selectedAnswers);
  const correctAnswers = useAppSelector((state) => state.quiz.correctAnswers);
  const score = useAppSelector((state) => state.quiz.score);
  const showModal = useAppSelector((state) => state.ui.showScoreModal);

  if (!questions.length) return <NoQuizMessage />;

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  const handleSelect = (index: number, answer: string) => {
    dispatch(selectAnswer({ index, answer }));
  };

  const handleSubmit = () => {
    dispatch(submitQuiz({ questions, answers: selectedAnswers }));
    dispatch(setShowScoreModal(true));
  };

  const handleReset = () => {
    dispatch(resetQuiz());
    dispatch(setShowScoreModal(false));
    navigate("/");
  };

  return (
    <div className="container pt-5 text-light bg-dark p-4 rounded shadow">
      {questions.map((q, idx) => (
        <div
          key={q.question}
          className="mb-4 pb-3 border-bottom border-secondary"
        >
          <h2 className="h5 mb-2">
            Question {idx + 1} of {questions.length}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: q.question }} />

          <div className="d-flex flex-column gap-2 mt-3">
            {Array.isArray(q.answers) &&
              q.answers.map((answer) => {
                const selected = selectedAnswers[idx];
                const correct = correctAnswers[idx];
                const isCorrect = answer === correct;
                const isSelected = selected === answer;

                let btnClass = "btn btn-outline-light";
                if (score !== null) {
                  if (isCorrect) btnClass = "btn btn-success";
                  else if (isSelected) btnClass = "btn btn-danger";
                } else if (isSelected) {
                  btnClass = "btn btn-primary";
                }

                return (
                  <button
                    key={answer}
                    onClick={() => handleSelect(idx, answer)}
                    disabled={selected !== undefined || score !== null}
                    className={btnClass}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                );
              })}
          </div>
        </div>
      ))}

      {allAnswered && score === null && (
        <button onClick={handleSubmit} className="btn btn-warning w-100 mt-3">
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <>
          <QuizScore
            show={showModal}
            onHide={() => dispatch(setShowScoreModal(false))}
            score={score}
            total={questions.length}
            onReset={handleReset}
          />
          <div className="text-center mt-4">
            <button onClick={handleReset} className="btn btn-outline-info">
              Start New Quiz
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
