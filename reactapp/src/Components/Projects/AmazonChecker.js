import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectData from "./ProjectData.json";
import imageMap from "./imageMap";
function AmazonChecker() {
  return (
    <div className="single-project-container">
      <h2>Amazon Checker</h2>
      <div className="introduction">
        {/* <div><img src={projectPic} alt="Amazon inventory checker project snapshot"/></div> */}
        <div>{projectData.amazon_checker.long}</div>
        <a
          href="https://github.com/michellevit/Amazon-Inventory-Checker-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo" className="light">
            GitHub Repository
          </button>
        </a>
      </div>
      <div>
        <h3>Demo</h3>
        <YouTubeEmbed embedId="WcHKO0UPXGo" />
      </div>
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Graphical User Interface</li>
          <li>Interactive Spreadsheet Handling</li>
          <li>Easy User Experience</li>
        </ul>
      </div>
      <div className="technologies-used">
        <h3>Technologies Used</h3>
        <ul className="tech">
          <li>Python</li>
          <li>Tkinter</li>
          <li>PyInstaller</li>
          <li>OpenPyXL</li>
          <li>GitHub</li>
        </ul>
        <div className="logo-images">
          <img src={imageMap["python"]} alt="Python logo" />
          <img src={imageMap["pyinstaller"]} alt="PyInstaller logo" />
          <img id="openpy" src={imageMap["openpyxl"]} alt="OpenPyXL logo" />
          <img src={imageMap["github"]} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}

export default AmazonChecker;
