import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectData from "./ProjectData.json";
import imageMap from "./imageMap";

function KibbeQuiz() {
  return (
    <div className="single-project-container">
      <h2>Kibbe Quiz</h2>
      <div className="introduction">
        {/* <div><img src={imageMap["kibbe_quiz"]} alt="Kibbe Quiz project snapshot" /></div> */}
        <div>{projectData.kibbe_quiz.long}</div>
        <a
          href="https://kibbebodytypes.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo" className="dark">
            Demo
          </button>
        </a>
        <a
          href="https://github.com/michellevit/Kibbe-Quiz/"
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
        <YouTubeEmbed embedId="9sR0VwgTKxE" />
      </div>
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Custom Algorithm</li>
          <li>Data Visualization</li>
          <li>Progress Bar</li>
          <li>WordPress Integration</li>
        </ul>
      </div>
      <div className="technologies-used">
        <h3>Technologies Used</h3>
        <ul className="tech">
          <li>JavaScript</li>
          <li>ChartJS</li>
          <li>WordPress</li>
          <li>GitHub</li>
        </ul>
        <div className="logo-images">
          <img src={imageMap["javascript"]} alt="JavaScript logo" />
          <img src={imageMap["chartjs"]} alt="ChartJS logo" />
          <img src={imageMap["wordpress"]} alt="WordPress logo" />
          <img src={imageMap["github"]} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}

export default KibbeQuiz;
