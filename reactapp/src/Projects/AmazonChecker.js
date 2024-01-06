import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectDescriptions from "./ProjectDescriptions.json";
import projectPic from "../static/amazon-checker-mockup.jpg";
import pythonLogo from "../static/logos/python-logo.png";
import openpyxlLogo from "../static/logos/openpyxl-logo.png";
import githubLogo from "../static/logos/github-logo.png";

function AmazonChecker() {
  return (
    <div className="single-project-container">
      <h2>Amazon Checker</h2>
      <div className="introduction">
        <div>
          <img
            src={projectPic}
            alt="Amazon inventory checker project snapshot"
          />
        </div>
        <div>{projectDescriptions.amazon_checker.long}</div>
        <a
            href="https://github.com/michellevit/Amazon-Inventory-Checker"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button id="git-repo" className="light">View Github Repository</button>
          </a>
      </div>
      <div>
        <h3>Demo</h3>
        <YouTubeEmbed embedId="lD-wTry930w" />
      </div>
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Custom Greedy Algorithm</li>
          <li>Spreadsheet Reading/Writing</li>
          <li>Easy Batch Script Deployment</li>
        </ul>
      </div>
      <div className="technologies-used">
        <h3>Technologies Used</h3>
        <ul className="tech">
          <li>Python</li>
          <li>OpenPyXL</li>
          <li>GitHub</li>
        </ul>
        <div className="logo-images">
          <img src={pythonLogo} alt="Python logo" />
          <img id="openpy" src={openpyxlLogo} alt="OpenPyXL logo" />
          <img src={githubLogo} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}

export default AmazonChecker;
