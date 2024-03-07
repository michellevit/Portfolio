import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import ProductionPlanner from "./Projects/ProductionPlanner";
import FantasyDG from "./Projects/FantasyDG";
import AmazonChecker from "./Projects/AmazonChecker";
import KibbeQuiz from "./Projects/KibbeQuiz";
import SiteBlocker from "./Projects/SiteBlocker";
import CommentAnalyzer from "./Projects/CommentAnalyzer";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const location = useLocation(); 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="app">
      <Navbar />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade" 
          timeout={300} 
        >
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/production-planner"
                element={<ProductionPlanner />}
              />
              <Route path="/fantasy-dg" element={<FantasyDG />} />
              <Route path="/amazon-checker" element={<AmazonChecker />} />
              <Route path="/kibbe-quiz" element={<KibbeQuiz />} />
              <Route path="/site-blocker" element={<SiteBlocker />} />
              <Route path="/comment-analyzer" element={<CommentAnalyzer />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
