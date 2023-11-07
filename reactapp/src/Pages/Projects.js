import React, {useState, useEffect} from "react";
import "./Projects.css";
import projectPic1 from "../static/production-planner-mockup.jpg";
import projectPic2 from "../static/amazon-checker-mockup.jpg";
import projectPic3 from "../static/kbt-mockup.jpg";
import { Link } from "react-router-dom";


function Projects() {
  const [projectText1, setProjectText1] = useState("");
  const [projectText2, setProjectText2] = useState("");
  const [projectText3, setProjectText3] = useState("");

  const updateProjectText = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 900) {
      setProjectText1("A full-stack application to facilitate the sales to shipping process. EXTRA TEXT HERE");
      setProjectText2("A python script to automate the Amazon order confirmation process. EXTRA TEXT HERE");
      setProjectText3("A JavaScript quiz with a customer algorithm and charted results. EXTRA TEXT HERE");
    } else {
      setProjectText1("A full-stack application to facilitate the sales to shipping process.");
      setProjectText2("A python script to automate the Amazon order confirmation process.");
      setProjectText3("A JavaScript quiz with a customer algorithm and charted results.");
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
    <div className="featured-project">
      <div className="project-image">
        <img src={projectPic2} alt="Amazon inventory checker project snapshot" />
        <div className="project-image-text"><h2>Python</h2></div>
        </div>
      <div className="project-text">
        <h3>Amazon Inventory Checker</h3>
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
