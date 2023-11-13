import React, {useState, useEffect} from "react";
import "./Projects.css";
import projectPic1 from "../static/production-planner-mockup.jpg";
import projectPic2 from "../static/amazon-checker-mockup.jpg";
import projectPic3 from "../static/kbt-mockup.jpg";
import projectDescriptions from '../Projects/ProjectDescriptions.json';
import { Link, useLocation } from "react-router-dom";



function Projects() {
  const [projectText1, setProjectText1] = useState("");
  const [projectText2, setProjectText2] = useState("");
  const [projectText3, setProjectText3] = useState("");
  const [isHomePage, setIsHomePage] = useState(true);
  const location = useLocation();
  const updateProjectText = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 900) {
      setProjectText1(projectDescriptions.production_planner.long);
      setProjectText2(projectDescriptions.amazon_inventory.long);
      setProjectText3(projectDescriptions.kbt_quiz.long);
    } else {
      setProjectText1(projectDescriptions.production_planner.short);
      setProjectText2(projectDescriptions.amazon_inventory.short);
      setProjectText3(projectDescriptions.kbt_quiz.short);
    }
  };
  const updateCurrentPage = () => {
    if (location.pathname !== '/') {
      setIsHomePage(false);
    }
  }
  useEffect(() => {
    updateProjectText();
    updateCurrentPage();
    window.addEventListener('resize', updateProjectText);
    return () => window.removeEventListener('resize', updateProjectText);
  }, []);

  return <div className="projects-container">
    <h2>{isHomePage ? "Featured Projects" : "Projects"}</h2>
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
    <div className="featured-project">
      <div className="project-image">
        <img src={projectPic2} alt="Amazon inventory checker project snapshot" />
        <div className="project-image-text"><h2>Python</h2></div>
        </div>
      <div className="project-text">
        <h3>Inventory Checker</h3>
        <p>{projectText2}</p>
        <p className="read-more-link"><Link to="/amazon-checker">Read more<span>&#10230;</span></Link></p>
        </div>
    </div>
    <div className="featured-project">
      <div className="project-image">
        <img src={projectPic3} alt="JavaScript quiz project snapshot" />
        <div className="project-image-text"><h2>JavaScript</h2></div>
        </div>
      <div className="project-text">
        <h3>Typing Quiz</h3>
        <p>{projectText3}</p>
        <p className="read-more-link"><Link to="/kibbe-quiz">Read more<span>&#10230;</span></Link></p>
        </div>
    </div>
  </div>
}

export default Projects;
