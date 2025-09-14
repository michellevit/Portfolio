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
            I started my career in administration and accounting, but I kept
            turning to code to make my day-to-day work easier. It started as a
            few simple scripts but quickly turned into building full apps like
            my <Link to="/production-planner">Production Planner</Link> and{" "}
            <Link to="/amazon-checker">Amazon Checker</Link> tools.
          </p>
          <p>
            Recently I decided to return to school to fill in the gaps of what
            I'd been learning on my own. I am now studying computer science at{" "}
            <a href="https://oregonstate.edu/">OSU</a>, balancing academics with
            a software co-op role at <a href="https://www.amgen.com/">Amgen</a>.
          </p>
          <p>
            I still code for fun though - currently I'm working on{" "}
            <Link to="/dg-draft">a fantasy disc golf app</Link>.
            {/* and an{" "}
            <a
              href="https://fennec.michellef.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              8-bit inspired fox animation
            </a> */}
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
