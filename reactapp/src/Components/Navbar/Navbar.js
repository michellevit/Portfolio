// src/Components/Navbar

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [scrolled]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const handleHamburgerMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navbarContainerClasses = scrolled
    ? "navbar-container smaller"
    : "navbar-container";
  const navbarContainerBGClasses = scrolled
    ? "navbar-container-background smaller"
    : "navbar-container-background";
  const hamburgerMenuContainerClasses = scrolled
    ? "hamburger-menu-container smaller"
    : "hamburger-menu-container";
  const navClasses = `${menuOpen ? "open" : ""} ${scrolled ? "smaller" : ""}`;
  const ulClasses = `${menuOpen ? "open" : ""} ${scrolled ? "smaller" : ""}`;

  return (
    <div className="outer-nav">
      <div className={navbarContainerClasses}>
        <div className={navbarContainerBGClasses}></div>
        <div className="navbar-content">
          <div className="site-title">
            <NavLink to="/">Michelle&nbsp;Flandin</NavLink>
          </div>

          <div
            className={hamburgerMenuContainerClasses}
            onClick={handleHamburgerMenu}
          >
            <div
              className={
                menuOpen ? "hamburger-menu icon-open" : "hamburger-menu"
              }
            >
              <div className="hamburger-menu-button"></div>
            </div>
          </div>
        </div>

        <nav className={navClasses}>
          <ul className={ulClasses}>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="theme-toggle">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
