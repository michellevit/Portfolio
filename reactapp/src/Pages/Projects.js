// src/Projects/index.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
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

function formatTitle(slug) {
  return slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default Projects;
