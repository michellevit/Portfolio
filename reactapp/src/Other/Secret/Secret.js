import React from "react";
import { Link } from "react-router-dom";
import "./Secret.css";
import worldImage from "./assets/world.jpg";

function Secret() {
  return (
    <div className="secret" style={{ textAlign: "center", padding: "20px" }}>
      <div className="secret-button-container">
        <Link to="/secret/quiz" className="secret-quiz-button">
          Enter the Secret Quiz
        </Link>
      </div>
    </div>
  );
}

export default Secret;
