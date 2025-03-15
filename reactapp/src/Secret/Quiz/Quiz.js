import React, { useState } from "react";
import "./Quiz.css";
import questionsData from "./questions.json";
import godelImage from '../assets/quiz/godel.png'
import wittgensteinImage from '../assets/quiz/wittgenstein.png'
import Confetti from "react-confetti";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questionsData.questions.length).fill(null));
  const [result, setResult] = useState(null);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    
    if (currentQuestion === questionsData.questions.length - 1) {
      setResult(answer === "Totally" ? "Godel" : "Wittgenstein");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className={`quiz-container ${result === "Godel" ? "black-and-white" : ""}`}>
      <h1 className="quiz-title">Are you a Gödel or Wittgenstein?</h1>
      <div className="quiz-layout">
        <img
          src={wittgensteinImage}
          alt="Wittgenstein"
          className={`quiz-image ${result === "Wittgenstein" ? "highlight" : "dimmed"}`}
        />
        {!result ? (
          <div className="quiz-question">
            <p>{questionsData.questions[currentQuestion].question}</p>
            <div className="quiz-buttons">
              <button onClick={() => handleAnswer("Totally")}>Totally</button>
              <button onClick={() => handleAnswer("No way")}>No way</button>
            </div>
          </div>
        ) : (
          <div className="quiz-result">
            <marquee className="quiz-marquee">You are {result}!</marquee>
            <p className={`result-message ${result === "Godel" ? "result-godel" : "result-wittgenstein"}`}>
              {result === "Wittgenstein" 
                ? "You are SUCH a Wittgenstein!"
                : "You have failed. Nothing is absolute, except that you are wrong."}
            </p>
            {result === "Wittgenstein" && <Confetti />}
          </div>
        )}
        <img
          src={godelImage}
          alt="Godel"
          className={`quiz-image ${result === "Godel" ? "highlight" : "dimmed"}`}
        />
      </div>
    </div>
  );
}

export default Quiz;