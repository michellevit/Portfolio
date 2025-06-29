// src/Components/Projects/ProjectCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

const tagDisplayMap = {
  "chrome-extension": "Chrome Extension",
  django: "Django",
  "github-api": "GitHub API",
  "gumroad-api": "Gumroad API",
  "html/css": "HTML/CSS",
  huggingface: "Hugging Face",
  javascript: "JavaScript",
  mysql: "MySQL",
  next: "Next.js",
  node: "Node.js",
  nlp: "NLP",
  openpyxl: "OpenPyXL",
  postgresql: "PostgreSQL",
  productivity: "Productivity",
  python: "Python",
  quiz: "Quiz",
  rails: "Rails",
  react: "React",
  ruby: "Ruby",
  tkinter: "Tkinter",
  typescript: "TypeScript",
  "youtube-api": "YouTube API",
};

function ProjectCard({ projectKey, title, description, image, tags, links }) {
  return (
    <Link
      to={`/${projectKey.replace(/_/g, "-")}`}
      className="project-card-link"
    >
      <div className="project-card">
        <img src={image} alt={`${title} snapshot`} />
        <div className="project-content">
          <h3>{title}</h3>
          <p>{description}</p>

          <div className="project-tags">
            {tags
              .filter((tag) => tag !== "featured")
              .map((tag) => (
                <span key={tag} className="tag">
                  {tagDisplayMap[tag] || tag}
                </span>
              ))}
          </div>

          <div className="project-links">
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noreferrer">
                Demo
              </a>
            )}
            {links.video && (
              <a href={links.video} target="_blank" rel="noreferrer">
                Video
              </a>
            )}
            {links.repo && (
              <a href={links.repo} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
