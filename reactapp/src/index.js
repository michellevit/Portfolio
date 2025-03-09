import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MattIs32 from "./Components/MattIs32/MattIs32";
import FoxAnimation from "./Components/FoxAnimation/FoxAnimation";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// Check if we were redirected from GitHub Pages' 404.html
const urlParams = new URLSearchParams(window.location.search);
const redirectPath = urlParams.get("redirect");

// If a redirect exists, update the browser history to correct the route
if (redirectPath) {
  window.history.replaceState(null, "", redirectPath);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
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
