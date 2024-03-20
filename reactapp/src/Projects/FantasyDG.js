import React from "react";
import "./SingleProject.css";
// import YouTubeEmbed from "./YouTubeEmbed";
import projectDescriptions from "./ProjectDescriptions.json";
// import projectPic from "../static/fantasydg-mockup.jpg";
import reactLogo from "../static/logos/react-logo.png";
import typescriptLogo from "../static/logos/typescript-logo.png";
import rubyLogo from "../static/logos/ruby-logo.png";
import railsLogo from "../static/logos/rails-logo.svg";
import postgresLogo from "../static/logos/postgres-logo.png";
import herokuLogo from "../static/logos/heroku-logo.png";
import githubLogo from "../static/logos/github-logo.png";

function FantasyDG() {
  return (
    <div className="single-project-container">
      <h2>Fantasy Disc Golf Website</h2>
      <div className="introduction">
        {/* <div>
          <img src={projectPic} alt="FantasyDG project snapshot" />
        </div> */}
        <div>{projectDescriptions.fantasy_dg.long}</div>
        <a
          href="https://dgdraft.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo" className="dark">
            View Website
          </button>
        </a>
        <a
          href="https://github.com/michellevit/DG-Bets/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo" className="light">
            View GitHub Repository
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
          <li>Google login integration (TBD)</li>
          <li>Password recovery (TBD)</li>
          <li>Real-time data synchronization for drafts (TBD)</li>
          <li>Interactive player profiles (TBD)</li>
          <li>Dynamic Leaderboards (TBD)</li>
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
          <li>GitHub</li>
        </ul>
        <div className="logo-images">
          <img src={typescriptLogo} alt="TypeScript logo" />
          <img src={reactLogo} alt="React logo" />
          <a src="https://www.ruby-lang.org/">
            <img src={rubyLogo} alt="Ruby logo" />
          </a>
          <img src={railsLogo} alt="Rails logo" />
          <img src={postgresLogo} alt="Postgres logo" />
          <img src={herokuLogo} alt="Heroku logo" />
          <img src={githubLogo} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}

export default FantasyDG;
