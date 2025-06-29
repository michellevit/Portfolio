import React from "react";
import "./SingleProject.css";
// import YouTubeEmbed from "./YouTubeEmbed";
import projectData from "./ProjectData.json";
import imageMap from "./imageMap";

function DGDraft() {
  return (
    <div className="single-project-container">
      <h2>Fantasy Disc Golf Website</h2>
      <div className="introduction">
        <div>
          <img
            src={imageMap["dg_draft"]}
            alt="Fantasy Disc Golf project snapshot"
          />
        </div>
        <div>{projectData.dg_draft.long}</div>
        {/* <a href="https://dgdraft.com" target="_blank" rel="noopener noreferrer">
          <button id="git-repo" className="dark">
            Demo
          </button>
        </a> */}
        <a
          href="https://github.com/michellevit/DG-Draft/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo" className="light">
            GitHub Repository
          </button>
        </a>
      </div>
      {/* <div>
          <h3>Demo</h3>
          <YouTubeEmbed embedId="9sR0VwgTKxE" />
        </div> */}
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Token-based authentication</li>
          <li>User login and account creation</li>
          <li>Dynamic Leaderboards</li>
          <li>Real-time data synchronization for drafts (TBD)</li>
          <li>Interactive player profiles (TBD)</li>
        </ul>
      </div>
      <div className="technologies-used">
        <h3>Technologies Used</h3>
        <ul className="tech">
          <li>TypeScript</li>
          <li>React</li>
          <li>Ruby</li>
          <li>Rails</li>
          <li>Postgres</li>
          <li>Heroku</li>
          <li>GitHub</li>
        </ul>
        <div className="logo-images">
          <img src={imageMap["typescript"]} alt="TypeScript logo" />
          <img src={imageMap["react"]} alt="React logo" />
          <a href="https://www.ruby-lang.org/">
            <img src={imageMap["ruby"]} alt="Ruby logo" />
          </a>
          <img src={imageMap["rails"]} alt="Rails logo" />
          <img src={imageMap["postgres"]} alt="Postgres logo" />
          <img src={imageMap["heroku"]} alt="Heroku logo" />
          <img src={imageMap["github"]} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}

export default DGDraft;
