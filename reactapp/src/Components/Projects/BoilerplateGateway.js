import React from "react";
import "./SingleProject.css";
// import YouTubeEmbed from "./YouTubeEmbed";
import projectData from "./ProjectData.json";
import imageMap from "./imageMap";

function BoilerplateGateway() {
  return (
    <div className="single-project-container">
      <h2>Boilerplate Access Gateway</h2>
      <div className="introduction">
        <div>
          <img
            src={imageMap["boilerplate_gateway"]}
            alt="Boilerplate gateway access project snapshot"
          />
        </div>
        <div>{projectData.boilerplate_gateway.long}</div>
        <a
          href="https://github.com/michellevit/Boilerplate-Access-Gateway"
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
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imageMap["nextjs"]} alt="Next.js logo" height="20px" />
          </a>
          <img src={imageMap["nodejs"]} alt="Node.js logo" />
          <img src={imageMap["react"]} alt="React logo" />
          <a
            href="https://gumroad.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imageMap["gumroad"]} alt="Gumroad logo" />
          </a>
          <img src={imageMap["github"]} alt="GitHub logo" />
          <img src={imageMap["heroku"]} alt="Heroku logo" height="30px" />
        </div>
      </div>
    </div>
  );
}

export default BoilerplateGateway;
