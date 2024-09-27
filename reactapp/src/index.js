import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MattIs32 from "./Pages/MattIs32";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route for MattIs32 - will show only this component */}
        <Route path="/matt-is-32" element={<MattIs32 />} />
        
        {/* Main application routes */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// ORIGINAL CODE:

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
