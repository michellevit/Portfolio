import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import ProductionPlanner from "./Projects/ProductionPlanner";
import AmazonChecker from "./Projects/AmazonChecker";
import KibbeQuiz from "./Projects/KibbeQuiz";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
      <div className="app">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/production-planner" element={<ProductionPlanner />} />
            <Route path="/amazon-checker" element={<AmazonChecker />} />
            <Route path="/kibbe-quiz" element={<KibbeQuiz />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
