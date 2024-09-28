import React, { useEffect } from "react";
import "./About.css";
import profilePic from "../static/ProfilePic.jpg";
import { annotate, annotationGroup } from "rough-notation";
import { Link } from "react-router-dom";

function About() {
  const [isHomePage, setIsHomePage] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const a1 = annotate(document.querySelector("#e1"), {
      type: "highlight",
      color: "#e7cffe",
    });
    const a2 = annotate(document.querySelector("#e2"), {
      type: "highlight",
      color: "#f6c7e0",
    });
    const a3 = annotate(document.querySelector("#e3"), {
      type: "highlight",
      color: "#f0dd81",
    });
    const a4 = annotate(document.querySelector("#e4"), {
      type: "highlight",
      color: "#fdc3bf",
    });
    const a5 = annotate(document.querySelector("#e5"), {
      type: "highlight",
      color: "#e7cffe",
    });
    const a6 = annotate(document.querySelector("#e6"), {
      type: "highlight",
      color: "#f6c7e0",
    });
    const a7 = annotate(document.querySelector("#e7"), {
      type: "circle",
      color: "#f0dd81",
    });
    // const a8 = annotate(document.querySelector("#e8"), {
    //   type: "highlight",
    //   color: "#fdc3bf",
    // });
    // const a9 = annotate(document.querySelector("#e9"), {
    //   type: "highlight",
    //   color: "#e7cffe",
    // });
    // const e10 = annotate(document.querySelector("#e10"), {
    //   type: "circle",
    //   color: "#f6c7e0",
    // });
    const ag = annotationGroup([a1, a2, a3, a4, a5, a6, a7]);
    const screenWidth = window.innerWidth;
    if (screenWidth >= 0) {
      ag.show();
    }
  });

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
    <div className="about-container">
      <div className="about-text">
        <h2>
          Hello! I'm Michelle, a <span id="e1">developer</span> based in
          Vancouver.
        </h2>
        <p>
          I first encountered computer science at{" "}
          <span id="e1">UBC</span>, and though my path led me into{" "}
          <span id="e2">administration and accounting</span>,{" "}
          I found myself gravitating back towards coding as I discovered the value in{" "}
          <Link to="/amazon-checker"><span id="e3">automating simple tasks</span></Link>{" "}
          and{" "}
          <Link to="/production-planner"><span id="e4">modernizing workflows</span></Link>.
        </p>
        <p>
          I'm currently working on integrating courier APIs into my{" "}
          <Link to="/production-planner"><span id="e5">Production Planner</span></Link>{" "}
          app, and creating a{" "}
          <Link to="/dg-draft"><span id="e6">Fantasy Disc Golf</span></Link>{" "}
          app as a
          fun side-project. 
        </p>
        <p>
          Please don't hesitate to{" "}
          <span id="e7" className="about-contact">
            <li>
              <Link to="/contact">contact me</Link>
            </li>
          </span>{" "}
          if you have any questions about my work.
        </p>
        <div className="about-buttons">
          <a
            href="https://www.linkedin.com/in/michelle-flandin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button id="linked" className="dark">View LinkedIn</button>
          </a>
          <a
            href="https://github.com/michellevit"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button className="light">View GitHub</button></a>
        </div>
      </div>
      <div className="about-picture">
        <img src={profilePic} alt="Me at the Grand Canyon in AZ, USA." />
      </div>
    </div>
  );
}

export default About;
