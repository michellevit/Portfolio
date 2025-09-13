import React from "react";
import "./SingleProject.css";
import YouTubeEmbed from "./YouTubeEmbed";
import projectData from "./ProjectData.json";
import imageMap from "./imageMap";

function ProductionPlanner() {
  return (
    <div className="single-project-container">
      <h2>Production Planner</h2>
      <div className="introduction">
        {/* <div><img src={imageMap["production_planner"]} alt="Production Planner project snapshot" /></div> */}
        <div>{projectData.production_planner.long}</div>
        <a
          href="https://production-planner.michellef.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo" className="dark">
            Demo
          </button>
        </a>
        <a
          href="https://github.com/michellevit/Production-Planner"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="git-repo" className="light">
            GitHub Repository
          </button>
        </a>
      </div>
      <div>
        <h3>Video Overview</h3>
        <YouTubeEmbed embedId="J0YNExrDqck" />
      </div>
      <div className="key-features">
        <h3>Key Features</h3>
        <ul>
          <li>Real-time data updates</li>
          <li>
            Server-Sent Events (SSE) for real-time backend-frontend updates
          </li>
          <li>Queryset search and filters</li>
          <li>Pagination</li>
          <li>Database indexing</li>
          <li>Object-Relational Mapping</li>
        </ul>
        <div>
          <img
            src={imageMap["orm_example"]}
            alt="Example of Django ORM in the Production Planner project"
          />
        </div>
      </div>
      <div className="technologies-used">
        <h3>Technologies Used</h3>
        <ul className="tech">
          <li>Backend: Django, Python</li>
          <li>Frontend: React, JavaScript</li>
          <li>Database: MySQL</li>
          <li>Other: Docker, GitHub</li>
        </ul>
        <div className="logo-images">
          <img id="django" src={imageMap["django"]} alt="Django logo" />
          <img src={imageMap["python"]} alt="Python logo" />
          <img src={imageMap["react"]} alt="React logo" />
          <img src={imageMap["javascript"]} alt="JavaScript logo" />
          <a href="https://www.mysql.com/">
            <img src={imageMap["mysql"]} alt="MySQL logo" />
          </a>
          <img src={imageMap["docker"]} alt="Docker logo" />
          <img src={imageMap["github"]} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}

export default ProductionPlanner;
