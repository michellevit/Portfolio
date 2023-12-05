import React, { useEffect } from "react";
import "./About.css";
import profilePic from "../static/ProfilePic.jpg";
import { annotate, annotationGroup } from "rough-notation";
import { Link } from "react-router-dom";

function About() {
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
      type: "highlight",
      color: "#f0dd81",
    });
    const a8 = annotate(document.querySelector("#e8"), {
      type: "highlight",
      color: "#fdc3bf",
    });
    const a9 = annotate(document.querySelector("#e9"), {
      type: "circle",
      color: "#e7cffe",
    });
    const ag = annotationGroup([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
    const screenWidth = window.innerWidth;
    if (screenWidth >= 0) {
      ag.show();
    }
  });

  return (
    <div className="about-container">
      <div className="about-text">
        <h2>
          Hello! I'm Michelle, a <span id="e1">developer</span> based in
          Vancouver.
        </h2>
        <p>
          I love building tools that are{" "}
          <span id="e2">user-friendly, simple,</span> and{" "}
          <span id="e3">practical</span>.
        </p>
        <p>
          While studying at UBC I was introduced to computer science, and
          afterwards I continued to learn by working on projects of increasing
          complexity - from automating small tasks with{" "}
          <span id="e4">Python</span> to a full-stack web application using{" "}
          <span id="e5">Django, MYSQL, and React</span>.
        </p>
        <p>
          Through these experiences, I had the opportunity to work both
          independently and as part of a team, and developed a working style
          that leans towards <span id="e6">flexibility, </span>
          <span id="e7">clarity,</span> and <span id="e8">collaboration</span>.
        </p>
        <p>
          Please don't hesitate to{" "}
          <span id="e9" className="about-contact">
            <li>
              <Link to="/contact">contact me</Link>
            </li>
          </span>{" "}
          if you have any questions about my work.
        </p>
        <div className="about-buttons">
          <a
            href="https://www.linkedin.com/in/michelle-f-ba0a5017b/"
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
          <button className="light">View Github</button></a>
        </div>
      </div>
      <div className="about-picture">
        <img src={profilePic} alt="Picture of Michelle in Vancouver" />
      </div>
    </div>
  );
}

export default About;
