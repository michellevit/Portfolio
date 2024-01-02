import React, { useState, useEffect } from "react";
import "./Projects.css";
import projectPic1 from "../static/production-planner-mockup.jpg";
import projectPic2 from "../static/amazon-checker-mockup.jpg";
import projectPic3 from "../static/kbt-mockup.jpg";
import projectPic4 from "../static/site-blocker-mockup.jpg";
import projectPic5 from "../static/comment-analyzer-mockup.jpg";
import projectDescriptions from "../Projects/ProjectDescriptions.json";
import { Link, useLocation } from "react-router-dom";

function Projects() {
  const [projectText1, setProjectText1] = useState("");
  const [projectText2, setProjectText2] = useState("");
  const [projectText3, setProjectText3] = useState("");
  const [projectText4, setProjectText4] = useState("");
  const [projectText5, setProjectText5] = useState("");
  const [isHomePage, setIsHomePage] = useState(true);
  const location = useLocation();
  const updateProjectText = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 900) {
      setProjectText1(projectDescriptions.production_planner.long);
      setProjectText2(projectDescriptions.amazon_checker.long);
      setProjectText3(projectDescriptions.kbt_quiz.long);
      setProjectText4(projectDescriptions.site_blocker.long);
      setProjectText5(projectDescriptions.comment_analyzer.long);
    } else {
      setProjectText1(projectDescriptions.production_planner.short);
      setProjectText2(projectDescriptions.amazon_checker.short);
      setProjectText3(projectDescriptions.kbt_quiz.short);
      setProjectText4(projectDescriptions.site_blocker.short);
      setProjectText5(projectDescriptions.comment_analyzer.short);
    }
  };
  const updateCurrentPage = () => {
    if (location.pathname !== "/") {
      setIsHomePage(false);
    }
  };
  useEffect(() => {
    updateProjectText();
    updateCurrentPage();
    window.addEventListener("resize", updateProjectText);
    return () => window.removeEventListener("resize", updateProjectText);
  }, [updateCurrentPage]);

  return (
    <div className="projects-container">
      <h2>{isHomePage ? "Featured Projects" : "Projects"}</h2>
      <div className="featured-project">
        <div className="project-image">
          <img src={projectPic1} alt="Production Planner project snapshot" />
          <Link to="/production-planner">
            <div className="project-image-text">
              <h2>
                Django<br></br>React<br></br>MySQL
              </h2>
            </div>
          </Link>
        </div>
        <div className="project-text">
          <h3>Production Planner</h3>
          <p>{projectText1}</p>
          <p className="read-more-link">
            <Link to="/production-planner">
              Read more<span>&#10230;</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="featured-project">
        <div className="project-image">
          <img
            src={projectPic2}
            alt="Amazon inventory checker project snapshot"
          />
          <Link to="/amazon-checker">
            <div className="project-image-text">
              <h2>Python</h2>
            </div>
          </Link>
        </div>
        <div className="project-text">
          <h3>Inventory Checker</h3>
          <p>{projectText2}</p>
          <p className="read-more-link">
            <Link to="/amazon-checker">
              Read more<span>&#10230;</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="featured-project">
        <div className="project-image">
          <img src={projectPic3} alt="JavaScript quiz project snapshot" />
          <Link to="/kibbe-quiz">
            <div className="project-image-text">
              <h2>JavaScript</h2>
            </div>
          </Link>
        </div>
        <div className="project-text">
          <h3>Typing Quiz</h3>
          <p>{projectText3}</p>
          <p className="read-more-link">
            <Link to="/kibbe-quiz">
              Read more<span>&#10230;</span>
            </Link>
          </p>
        </div>
      </div>
      {isHomePage && (<center><Link to="/projects"><button className="dark">View All</button></Link></center>)}
      {!isHomePage && (
        <div className="featured-project">
          <div className="project-image">
            <img
              src={projectPic4}
              alt="Site Blocker Chrome extension project snapshot"
            />
            <Link to="/site-blocker">
              <div className="project-image-text">
                <h2>JavaScript</h2>
              </div>
            </Link>
          </div>
          <div className="project-text">
            <h3>Site Blocker Chrome Extension</h3>
            <p>{projectText4}</p>
            <p className="read-more-link">
              <Link to="/site-blocker">
                Read more<span>&#10230;</span>
              </Link>
            </p>
          </div>
        </div>
      )}
      {!isHomePage && (
        <div className="featured-project">
          <div className="project-image">
            <img src={projectPic5} alt="Comment Analyzer project snapshot" />
            <Link to="/comment-analyzer">
              <div className="project-image-text">
                <h2>Python</h2>
              </div>
            </Link>
          </div>
          <div className="project-text">
            <h3>YouTube Comment Sentiment Analyzer</h3>
            <p>{projectText5}</p>
            <p className="read-more-link">
              <Link to="/comment-analyzer">
                Read more<span>&#10230;</span>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
