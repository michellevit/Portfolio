import React from "react";
import "./SingleProject.css";
// import YouTubeEmbed from "./YouTubeEmbed";
import projectDescriptions from "./ProjectDescriptions.json";
import projectPic from "../static/boilerplate-gateway-mockup.jpg";
import nextjsLogo from "../static/logos/nextjs-logo.svg";
import nodejsLogo from "../static/logos/nodejs-logo.svg";
import reactLogo from "../static/logos/react-logo.png";
import gumroadLogo from "../static/logos/gumroad-logo.png";
import githubLogo from "../static/logos/github-logo.png";
import herokuLogo from "../static/logos/heroku-logo.png";


function BoilerplateGateway() {
  return (
    <div className="single-project-container">
      <h2>Boilerplate Access Gateway</h2>
      <div className="introduction">
        <div><img src={projectPic} alt="Boilerplate gateway access project snapshot"/></div>
        <div>{projectDescriptions.boilerplate_gateway.long}</div>
        <a
          href="https://github.com/michellevit/Boilerplate-Access-Gateway"
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
        <YouTubeEmbed embedId="lD-wTry930w" />
      </div> */}
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Gumroad API for License Authentication</li>
          <li>GitHub API for Repository Management</li>
          <li>Heroku CI/CD Pipeline Integration</li>
        </ul>
      </div>
      <div className="technologies-used">
        <h3>Technologies Used</h3>
        <ul className="tech">
          <li>Next.js</li>
          <li>Node.js</li>
          <li>React</li>
          <li>Gumroad API</li>
          <li>GitHub API</li>
          <li>Heroku</li>
        </ul>
        <div className="logo-images">
          <a href="https://vercel.com"><img src={nextjsLogo} alt="Next.js logo" height="20px"/></a>
          <img src={nodejsLogo} alt="Node.js logo" />
          <img src={reactLogo} alt="React logo" />
          <a href="https://gumroad.com/"><img src={gumroadLogo} alt="Gumroad logo" /></a>
          <img src={githubLogo} alt="GitHub logo" />
          <img src={herokuLogo} alt="Heroku logo" height="30px"/>
        </div>
      </div>
    </div>
  );
}

export default BoilerplateGateway;
