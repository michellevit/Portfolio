import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectDescriptions from './ProjectDescriptions.json';
import projectPic from "../static/production-planner-mockup.jpg";
import ormExample from "../static/ORM-example.jpg";
import djangoLogo from "../static/logos/django-logo.png";
import pythonLogo from "../static/logos/python-logo.png";
import reactLogo from "../static/logos/react-logo.png";
import javascriptLogo from "../static/logos/javascript-logo.png";
import mysqlLogo from "../static/logos/mysql-logo.png";
import dockerLogo from "../static/logos/docker-logo.png";
import githubLogo from "../static/logos/github-logo.png";



function ProductionPlanner() {
  return <div className="single-project-container">
        <h2>Production Planner</h2>
        <div className='introduction'>
        {/* <div><img src={projectPic} alt="Production Planner project snapshot" /></div> */}
        <div>{projectDescriptions.production_planner.long}</div>
        {/* <a
            href="https://production-planner-demo.michellef.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button id="git-repo" className="dark">Try Demo</button>
          </a> */}
          <a
            href="https://github.com/michellevit/Production-Planner"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button id="git-repo" className="light">View GitHub</button>
          </a>
        </div>
        <div>
          <h3>Video Overview</h3>
          <YouTubeEmbed embedId="J0YNExrDqck" />
        </div>
        <div className="key-features"><h3>Key Features</h3>
        <ul>
          <li>Real-time data updates</li>
          <li>Server-Sent Events (SSE) for real-time backend-frontend updates</li>
          <li>Queryset search and filters</li>
          <li>Pagination</li>
          <li>Database indexing</li>
          <li>Object-Relational Mapping</li>
        </ul>
        <div><img src={ormExample} alt="Example of Django ORM in the Production Planner project" /></div>
        </div>
        <div className="technologies-used">
          <h3>Technologies Used</h3>
          <ul className="tech">
            <li>Backend: Django, Python</li>
            <li>Frontend: React, JavaScript</li>
            <li>Database: MySQL</li>
            <li>Other: Docker, GitHub</li>
            </ul>
            <div className='logo-images'>
              <img id='django' src={djangoLogo} alt="Django logo" />
              <img src={pythonLogo} alt="Python logo" />
              <img src={reactLogo} alt="React logo" />
              <img src={javascriptLogo} alt="JavaScript logo" />
              <a src="https://www.mysql.com/"><img src={mysqlLogo} alt="MySQL logo" /></a>
              <img src={dockerLogo} alt="Docker logo" />
              <img src={githubLogo} alt="GitHub logo" />
            </div>
          
        </div>
  </div>
}

export default ProductionPlanner;
