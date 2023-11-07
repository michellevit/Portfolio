import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  let location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  }, [location, setMenuOpen]); 
  const handleHamburgerMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="navbar-container">
      <div className="navbar-container-background">
        </div>
        <div className="site-title">
          <NavLink to="/">MICHELLE &nbsp;FLANDIN</NavLink>
        </div>
        <div className="hamburger-menu-container" onClick={handleHamburgerMenu}>
        <div className={menuOpen ? "hamburger-menu icon-open" : "hamburger-menu"} >
            <div class="hamburger-menu-button"></div>
        </div>
        </div>
        <nav>
          <ul className={menuOpen ? "open" : ""}>
            
              <NavLink to="/about"><li>About</li></NavLink>
              <NavLink to="/projects"><li>Projects</li></NavLink>
              <NavLink to="/contact"><li>Contact</li></NavLink>
          </ul>
        </nav>
      </div>
  );
}

export default Navbar;
