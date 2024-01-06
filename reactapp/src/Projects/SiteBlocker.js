import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectDescriptions from './ProjectDescriptions.json';
import projectPic from "../static/site-blocker-mockup.jpg";
import javascriptLogo from "../static/logos/javascript-logo.png";
import htmlLogo from "../static/logos/html-logo.png";
import githubLogo from "../static/logos/github-logo.png";





function SiteBlocker() {
  return <div className="single-project-container">
        <h2>Site Blocker Chrome Extension</h2>
        <div className='introduction'>
        <div><img src={projectPic} alt="Site Blocker Chrome extension project snapshot" /></div>
        <div>{projectDescriptions.site_blocker.long}</div>
        <a
            href="https://github.com/michellevit/Site-Blocker-Chrome-Extension"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button id="git-repo" className="light">View Github Repository</button>
          </a>
        </div>
        <div>
          <h3>Demo</h3>
          <YouTubeEmbed embedId="i5OJ-5s9mCA" />
        </div>
        <div className="key-features"><h3>Key Features</h3>
        <ul>
          <li>Chrome storage</li>
          <li>Queryset search and filters</li>
          <li>Pagination</li>
          <li>Database indexing</li>
          <li>Object-Relational Mapping</li>
        </ul>
        </div>
        <div className="technologies-used">
          <h3>Technologies Used</h3>
          <ul className="tech">
            <li>JavaScript</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>GitHub</li>
            </ul>
            <div className='logo-images'>
              <img src={javascriptLogo} alt="JavaScript logo" />
              <img src={htmlLogo} alt="HTML logo" />
              <img src={githubLogo} alt="GitHub logo" />
            </div>
          
        </div>
          </div>
}

export default SiteBlocker;
