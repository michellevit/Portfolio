import React, {useState, useEffect} from "react";
import "./Projects.css";
import projectPic1 from "../static/production-planner-mockup.jpg";
import { Link } from "react-router-dom";


function Projects() {
  const [projectText1, setProjectText1] = useState("");
  const updateProjectText = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 900) {
      setProjectText1("A full-stack application to facilitate the sales to shipping process. EXTRA TEXT HERE");
    } else {
      setProjectText1("A full-stack application to facilitate the sales to shipping process.");
    }
  };
  useEffect(() => {
    updateProjectText();
    window.addEventListener('resize', updateProjectText);
    return () => window.removeEventListener('resize', updateProjectText);
  }, []);

  return <div className="projects-container">
    <h2>Featured Projects</h2>
    <div className="featured-project">
      <div className="project-image">
        <img src={projectPic1} alt="Production Planner project snapshot" />
        <div className="project-image-text"><h2>Django<br></br>React<br></br>MySQL</h2></div>
        </div>
      <div className="project-text">
        <h3>Production Planner</h3>
        <p>{projectText1}</p>
        <p className="read-more-link"><Link to="/production-planner">Read more<span>&#10230;</span></Link></p>
        </div>
    </div>

  </div>
}

export default Projects;
