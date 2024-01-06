import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectDescriptions from './ProjectDescriptions.json';
import projectPic from "../static/comment-analyzer-mockup.jpg";
import pythonLogo from "../static/logos/python-logo.png";
import huggingfaceLogo from "../static/logos/huggingface-logo.png";
import githubLogo from "../static/logos/github-logo.png";



function CommentAnalyzer() {
  return <div className="single-project-container">
        <h2>YouTube Comment Sentiment Analyzer</h2>
        <div className='introduction'>
        <div><img src={projectPic} alt="Comment Analyzer project snapshot" /></div>
        <div>{projectDescriptions.comment_analyzer.long}</div>
        <a
            href="https://github.com/michellevit/Comment-Sentiment-Analyzer"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button id="git-repo" className="light">View Github Repository</button>
          </a>
        </div>
        <div>
          <h3>Demo</h3>
          <YouTubeEmbed embedId="EcYErMu0cjQ" />
        </div>
        <div className="key-features"><h3>Key Features</h3>
        <ul>
          <li>Uses the Google API to retrieve YouTube comments from a URL</li>
          <li>Calculates and sorts the positive, neutral, and negative comments</li>
          <li>Uses the Hugging Face model trained on ~58M tweets</li>

        </ul>
        </div>
        <div className="technologies-used">
          <h3>Technologies Used</h3>
          <ul className="tech">
            <li>Python</li>
            <li>OpenPyXL</li>
            <li>Google API</li>
            <li>Hugging Face</li>
            <li>TensorFlow</li>
            </ul>
            <div className='logo-images'>
              <img src={pythonLogo} alt="Python logo" />
              <img src={huggingfaceLogo} alt="Hugging Face logo" />
              <img src={githubLogo} alt="GitHub logo" />
            </div>
          
        </div>
  </div>
}

export default CommentAnalyzer;
