import React, { useEffect } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import confetti from "canvas-confetti";

interface QuizScoreProps {
  score: number;
  total: number;
  onReset: () => void;
  show: boolean;
  onHide: () => void;
}

const QuizScore: React.FC<QuizScoreProps> = ({
  score,
  total,
  onReset,
  show,
  onHide,
}) => {
  const percentage = (score / total) * 100;

  let variant: "danger" | "warning" | "success" = "danger";
  if (percentage >= 80) variant = "success";
  else if (percentage >= 50) variant = "warning";

  useEffect(() => {
    if (show && percentage >= 80) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [show, percentage]);

  const handleReset = () => {
    onReset();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>Quiz Complete</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light text-center">
        <p className="fs-5 mb-3">
          You scored {score} out of {total}
        </p>
        <ProgressBar
          now={percentage}
          label={`${Math.round(percentage)}%`}
          variant={variant}
          className="mb-4 progress-bar-striped progress-bar-animated"
        />
        <Button variant="outline-info" onClick={handleReset}>
          Start New Quiz
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default QuizScore;
