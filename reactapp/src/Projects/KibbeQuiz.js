import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectDescriptions from './ProjectDescriptions.json';
import projectPic from "../static/kbt-mockup.jpg";
import wordpressLogo from "../static/logos/wordpress-logo.png";
import chartjsLogo from "../static/logos/chartjs-logo.svg";
import javascriptLogo from "../static/logos/javascript-logo.png";
import githubLogo from "../static/logos/github-logo.png";



function KibbeQuiz() {
  return <div className="single-project-container">
        <h2>Kibbe Quiz</h2>
        <div className='introduction'>
        <div><img src={projectPic} alt="Amazon inventory checker project snapshot" /></div>
        <div>{projectDescriptions.kbt_quiz.long}</div>
        <a
            href="https://github.com/michellevit/Kibbe-Quiz/blob/main/quiz.js#L395"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button id="git-repo" className="light">View Github Repository</button>
          </a>
        </div>
        <div>
          <h3>Demo</h3>
          <YouTubeEmbed embedId="9sR0VwgTKxE" />
        </div>
        <div className="key-features"><h3>Key Features</h3>
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
            <div className='logo-images'>
              <img src={javascriptLogo} alt="JavaScript logo" />
              <img src={chartjsLogo} alt="ChartJS logo" />
              <img src={wordpressLogo} alt="WordPress logo" />
              <img src={githubLogo} alt="GitHub logo" />
            </div>
          
        </div>
  </div>
}

export default KibbeQuiz;
