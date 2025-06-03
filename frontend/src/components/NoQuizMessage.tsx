import React from "react";
import { useNavigate } from "react-router-dom";

const NoQuizMessage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div className="p-4 rounded text-center" style={{ maxWidth: "500px" }}>
        <h2 className="mb-3">No quiz loaded</h2>
        <p className="mb-4">
          It looks like no questions are available right now.
        </p>
        <button className="btn btn-outline-info" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NoQuizMessage;
