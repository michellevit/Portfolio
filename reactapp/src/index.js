import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeContext";
import MattIs32 from "./Other/MattIs32/MattIs32";
import Secret from "./Other/Secret/Secret";
import Quiz from "./Other/Secret/Quiz/Quiz";
import FoxAnimation from "./Other/FoxAnimation/FoxAnimation";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";

// Function to fix GitHub Pages 404 redirects
function RedirectHandler() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get("redirect");

    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, []);

  return null;
}
console.log("egg marks the spot...");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Route for MattIs32 - users who access this page will only see this component and not the portfolio menu, etc*/}
          <Route path="/matt-is-32" element={<MattIs32 />} />
          <Route path="/secret" element={<Secret />} />
          <Route path="/secret/quiz" element={<Quiz />} />
          {/* Catch-all with redirect logic */}
          <Route
            path="*"
            element={
              <>
                <RedirectHandler />
                <App />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
