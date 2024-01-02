import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setMenuOpen(false);

    const upperThreshold = 100;
    const lowerThreshold = 50;

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > upperThreshold && !scrolled) {
        setScrolled(true);
      } else if (offset < lowerThreshold && scrolled) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleHamburgerMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navbarContainerClasses = scrolled ? "navbar-container smaller" : "navbar-container";
  const navbarContainerBGClasses = scrolled ? "navbar-container-background smaller" : "navbar-container-background";
  const hamburgerMenuContainerClasses = scrolled ? "hamburger-menu-container smaller" : "hamburger-menu-container";
  const navClasses = `${menuOpen ? "open" : ""} ${scrolled ? "smaller" : ""}`;
  const ulClasses = `${menuOpen ? "open" : ""} ${scrolled ? "smaller" : ""}`;

  return (
    <div className={navbarContainerClasses}>
      <div className={navbarContainerBGClasses}></div>
      <div className="site-title">
        <NavLink to="/">Michelle &nbsp;Flandin</NavLink>
      </div>
      <div className={hamburgerMenuContainerClasses} onClick={handleHamburgerMenu}>
        <div className={menuOpen ? "hamburger-menu icon-open" : "hamburger-menu"} >
          <div className="hamburger-menu-button"></div>
        </div>
      </div>
      <nav className={navClasses}>
        <ul className={ulClasses}>
          <NavLink to="/about"><li>About</li></NavLink>
          <NavLink to="/projects"><li>Projects</li></NavLink>
          <NavLink to="/contact"><li>Contact</li></NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
