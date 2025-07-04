// src/Components/Navbar/Navbar.js

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 1) Track scroll for “smaller” header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2) Close immediately when you scroll into “smaller” mode
  useEffect(() => {
    setMenuOpen(false);
  }, [scrolled]);

  // 3) **Close on route change** (this will fire whenever you click a NavLink)
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // 4) Collapse if you resize back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 600 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // 5) Toggle handler: flip open/closed and add .animate for 300ms
  const handleHamburger = () => {
    setAnimating(true);
    setMenuOpen((open) => !open);
    setTimeout(() => setAnimating(false), 300);
  };

  // build your class strings
  const navClasses = [
    menuOpen && "open",
    scrolled && "smaller",
    animating && "animate",
  ]
    .filter(Boolean)
    .join(" ");

  const ulClasses = [menuOpen && "open", scrolled && "smaller"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="outer-nav">
      <div className={`navbar-container${scrolled ? " smaller" : ""}`}>
        <div
          className={`navbar-container-background${scrolled ? " smaller" : ""}`}
        />
        <div className="navbar-content">
          <div className="site-title">
            <NavLink to="/">Michelle&nbsp;Flandin</NavLink>
          </div>
          <div
            className={`hamburger-menu-container${scrolled ? " smaller" : ""}`}
            onClick={handleHamburger}
          >
            <div className={`hamburger-menu${menuOpen ? " icon-open" : ""}`}>
              <div className="hamburger-menu-button" />
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
