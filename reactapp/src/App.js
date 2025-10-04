import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Navbar from "./Components/Navbar/Navbar";
import EasterEgg from "./Other/Secret/EasterEgg";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import AmazonChecker from "./Components/Projects/AmazonChecker";
import BoilerplateGateway from "./Components/Projects/BoilerplateGateway";
import CommentAnalyzer from "./Components/Projects/CommentAnalyzer";
import DGDraft from "./Components/Projects/DGDraft";
import Fennec from "./Components/Projects/Fennec";
import KibbeQuiz from "./Components/Projects/KibbeQuiz";
import Dashboard from "./Other/Dashboard/Dashboard";
import ProductionPlanner from "./Components/Projects/ProductionPlanner";
import SiteBlocker from "./Components/Projects/SiteBlocker";
import SpotifyCallback from "./Other/Dashboard/Widgets/Spotify/SpotifyCallback";
import NotFound from "./Pages/NotFound";
// import Resume from "./Pages/Resume";

// 🔁 GitHub Pages redirect support
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [location.search, navigate]);

  return null;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.body.className = defaultTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <>
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <div className="app">
        <EasterEgg />
        <RedirectHandler />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <div className="main-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/amazon-checker" element={<AmazonChecker />} />
                <Route
                  path="/boilerplate-gateway"
                  element={<BoilerplateGateway />}
                />
                <Route path="/comment-analyzer" element={<CommentAnalyzer />} />
                <Route path="/dg-draft" element={<DGDraft />} />
                <Route path="/fennec-animation" element={<Fennec />} />

                <Route path="/kibbe-quiz" element={<KibbeQuiz />} />
                <Route path="/dash" element={<Dashboard />} />
                {/* <Route path="/resume" element={<Resume />} /> */}
                <Route
                  path="/production-planner"
                  element={<ProductionPlanner />}
                />
                <Route path="/site-blocker" element={<SiteBlocker />} />
                <Route path="/spotify-callback" element={<SpotifyCallback />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}

export default App;
