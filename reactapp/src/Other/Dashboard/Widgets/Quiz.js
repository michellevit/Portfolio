import React, { useState } from "react";
import quizData from "./Quiz.json";
import "./Widgets.css";

export default function Quiz() {
  const [current, setCurrent] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const loadQuestion = () => {
    const random = quizData[Math.floor(Math.random() * quizData.length)];
    setCurrent(random);
    setUserAnswer("");
    setShowAnswer(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnswer(true);
  };

  return (
    <div className="widget">
      <h2>Quiz</h2>

      {!current ? (
        <div className="widget-content">
          <button onClick={loadQuestion}>Start Quiz</button>
        </div>
      ) : !showAnswer ? (
        <form onSubmit={handleSubmit} className="widget-content">
          <p className="quiz-question">🔹 {current.question}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="quiz-input"
            placeholder="Your answer..."
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="widget-content">
          <p>🧠 Correct answer: <code>{current.answer}</code></p>
          <button onClick={loadQuestion}>Another Question</button>
        </div>
      )}
    </div>
  );
}
