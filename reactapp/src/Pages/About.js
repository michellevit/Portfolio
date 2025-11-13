import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./About.css";
import CurrentlyReading from "../Components/CurrentlyReading/CurrentlyReading.js";
import profilePic from "../static/ProfilePic.jpg";
import { Typewriter } from "react-simple-typewriter";

function About() {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAboutPage(location.pathname === "/about");
  }, [location]);

  return (
    <div className="about-container">
      <div className="about-main-content">
        <div className="about-text">
          <h2>
            <Typewriter
              words={["Hi, I'm Michelle."]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={60}
              deleteSpeed={0}
              delaySpeed={1000}
              wrapperClassName="typewriter-wrapper"
            />
          </h2>
          <p>I'm a software developer based in Vancouver, BC.</p>

          <p>
            I'm currently studying computer science at{" "}
            <a href="https://oregonstate.edu/">Oregon State University</a> while
            working as a software engineering co-op at{" "}
            <a href="https://www.amgen.com/">Amgen</a>, where I collaborate with
            scientists and engineers to develop internal tools and data-driven
            applications.
          </p>
          <p>
            I love building things that automate workflows, like my
            <Link to="/production-planner">Production Planner</Link> app, but I
            also enjoy taking on projects that are just for fun, like my
            <Link to="/dg-draft">Fantasy Disc Golf App</Link>.
          </p>
          <p>
            Feel free to{" "}
            <Link to="/contact" className="about-contact">
              send me a message
            </Link>{" "}
            if you have any questions about my work!
          </p>

          <div className="about-buttons">
            <a
              href="https://github.com/michellevit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>GitHub</button>
            </a>
            <a
              href="https://www.linkedin.com/in/mflandin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>LinkedIn</button>
            </a>
          </div>
        </div>

        <div className="about-picture">
          <img src={profilePic} alt="Michelle on a hike in North Vancouver." />
        </div>
      </div>

      {isAboutPage && (
        <div className="currently-reading-section">
          <CurrentlyReading />
        </div>
      )}
    </div>
  );
}

export default About;
