import React from "react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";


function Home() {
  return <div className="home-container">
    <div className="home-div" id="about"><About /></div>
    <div className="home-div" id="projects"><Projects /></div>
    <div className="home-div" id="contact"><Contact /></div>
  </div>
}

export default Home;
