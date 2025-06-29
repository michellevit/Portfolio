import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  const Icon = () => {
    if (theme === "light") {
      return isHovered ? <FaRegLightbulb /> : <FaLightbulb />;
    } else {
      return isHovered ? <FaLightbulb /> : <FaRegLightbulb />;
    }
  };

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle theme"
    >
      <Icon />
    </button>
  );
};

export default ThemeToggle;
