import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import MattIs32 from "./Pages/MattIs32";
import AmazonChecker from "./Projects/AmazonChecker";
import BoilerplateGateway from "./Projects/BoilerplateGateway";
import CommentAnalyzer from "./Projects/CommentAnalyzer";
import DGDraft from "./Projects/DGDraft";
import KibbeQuiz from "./Projects/KibbeQuiz";
import ProductionPlanner from "./Projects/ProductionPlanner";
import SiteBlocker from "./Projects/SiteBlocker";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app">
      <Routes>
        {/* MattIs32 route without Navbar and main-container */}
        <Route path="/matt-is-32" element={<MattIs32 />} />
        
        {/* The rest of your routes with Navbar and main-container */}
        <Route 
          path="*" 
          element={
            <>
              <Navbar />
              <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                  <div className="main-container">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/amazon-checker" element={<AmazonChecker />} />
                      <Route path="/boilerplate-gateway" element={<BoilerplateGateway />} />
                      <Route path="/comment-analyzer" element={<CommentAnalyzer />} />
                      <Route path="/dg-draft" element={<DGDraft />} />
                      <Route path="/kibbe-quiz" element={<KibbeQuiz />} />
                      <Route path="/production-planner" element={<ProductionPlanner />} />
                      <Route path="/site-blocker" element={<SiteBlocker />} />
                    </Routes>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
