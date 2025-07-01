// src/Projects/index.js
import React, { useState } from "react";
import "./Projects.css";

import projectData from "../Components/Projects/ProjectData.json";
import ProjectCard from "../Components/Projects/ProjectCard";
import images from "../Components/Projects/imageMap";

const filterCategories = {
  all: "All",
  django: "Django",
  "ruby on rails": "Ruby on Rails",
  react: "React",
  python: "Python",
  javascript: "JavaScript",
  api: "APIs",
  sql: "SQL",
  // ml: "ML",
};

function Projects() {
  const [selectedTag, setSelectedTag] = useState("all");

  const getFilteredProjects = (tag) => {
    if (tag === "all") return Object.entries(projectData);
    if (tag === "api") {
      return Object.entries(projectData).filter(([_, val]) =>
        val.tags.some((t) => t.endsWith("-api"))
      );
    }
    if (tag === "sql") {
      return Object.entries(projectData).filter(([_, val]) =>
        val.tags.some((t) => t.endsWith("sql"))
      );
    }
    if (tag === "ml") {
      const mlTags = ["huggingface"];
      return Object.entries(projectData).filter(([_, val]) =>
        val.tags.some((t) => mlTags.includes(t))
      );
    }
    return Object.entries(projectData).filter(([_, val]) =>
      val.tags.includes(tag)
    );
  };

  const filteredProjects = getFilteredProjects(selectedTag);

  return (
    <div className="projects-container">
      <h2>Projects</h2>

      <div className="tag-filter">
        {[
          ["all", filterCategories["all"]],
          ...Object.entries(filterCategories)
            .filter(([key]) => key !== "all")
            .sort((a, b) => a[1].localeCompare(b[1])),
        ].map(([key, label]) => (
          <button
            key={key}
            className={selectedTag === key ? "active" : ""}
            onClick={() => setSelectedTag(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map(([key, val]) => (
          <ProjectCard
            projectKey={key}
            title={val.title}
            description={val.short}
            image={images[key]}
            tags={val.tags}
            links={val.links}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
