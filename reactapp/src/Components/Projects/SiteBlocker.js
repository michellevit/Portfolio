import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectData from "./ProjectData.json";
import imageMap from "./imageMap";

function SiteBlocker() {
  return (
    <div className="single-project-container">
      <h2>Site Blocker Chrome Extension</h2>
      <div className="introduction">
        {/* <div><img src={imageMap["site_blocker"]} alt="Site Blocker Chrome extension project snapshot" /></div> */}
        <div>{projectData.site_blocker.long}</div>
        <a
          href="https://github.com/michellevit/Site-Blocker-Chrome-Extension"
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
        <YouTubeEmbed embedId="Lb0UT2GqB4g" />
      </div>
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Chrome storage</li>
          <li>Block websites by URL</li>
          <li>Persistent data across browser sessions</li>
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
        <div className="logo-images">
          <img src={imageMap["javascript"]} alt="JavaScript logo" />
          <img src={imageMap["html"]} alt="HTML logo" />
          <img src={imageMap["github"]} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}

export default SiteBlocker;
