import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MattIs32 from "./Components/MattIs32/MattIs32";
import FoxAnimation from "./Components/FoxAnimation/FoxAnimation";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RedirectHandler />
      <Routes>
        {/* Route for MattIs32 - will show only this component */}
        <Route path="/matt-is-32" element={<MattIs32 />} />
        <Route path="/fennec" element={<FoxAnimation />} />
        {/* Main application routes */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
