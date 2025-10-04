import React from "react";
import "./SingleProject.css";
import projectData from "./ProjectData.json";
import imageMap from "./imageMap";

function Fennec() {
  return (
    <div className="single-project-container">
      <h2>Fox Animation</h2>
      <div className="introduction">
        <div>
          <img
            src={imageMap["fennec_animation"]}
            alt="Fennec fox animation project snapshot"
          />
        </div>
        <div>{projectData.fennec_animation.long}</div>
        <a
          href="https://fennec.michellef.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="demo">Demo</button>
        </a>
        <a
          href="https://github.com/michellevit/Fennec-Animation"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo">GitHub Repository</button>
        </a>
      </div>
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Canvas-based renderer</li>
          <li>Modular configuration</li>
          <li>Music-synced sprite animation</li>
        </ul>
      </div>
      <div className="technologies-used">
        <h3>Technologies Used</h3>
        <ul className="tech">
          <li>Next.js</li>
          <li>React</li>
          <li>HTML5 Canvas</li>
        </ul>
        <div className="logo-images">
          <img src={imageMap["react"]} alt="React logo" />
          <img src={imageMap["html"]} alt="HTML logo" />
          <img src={imageMap["github"]} alt="GitHub logo" />
          <img src={imageMap["nextjs"]} alt="Next.js logo" />
        </div>
      </div>
    </div>
  );
}

export default Fennec;
