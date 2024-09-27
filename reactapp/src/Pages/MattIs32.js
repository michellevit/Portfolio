// MattIs32.js

// To return portfolio to original:

// Return reactapp/src/index.js back to original
// Delete reactapp/src/static/confetti.png
// Delete reactapp/src/Pages/MattIs32.css
// Delete reactapp/src/Pages/MattIs32.js

import "./MattIs32.css";
import React, { useEffect } from 'react';

const MattIs32 = () => {
  const colors = [
    '#FF5733', // Red
    '#33FF57', // Green
    '#3357FF', // Blue
    '#F33FFF', // Pink
    '#F9FF33', // Yellow
    '#33FFF9', // Cyan
    '#FF33A1', // Magenta
    '#FFC300', // Gold
    '#DAF7A6', // Light Green
  ];

  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Randomize position, size, and color
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    
    document.body.appendChild(confetti);
    
    // Remove confetti after falling
    setTimeout(() => {
      confetti.remove();
    }, 6000); 
  };

  useEffect(() => {
    const interval = setInterval(createConfetti, 100); // 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="birthday-container">
      <div className="confetti"></div>
      <h1 className="birthday-message">🎉 Happy Birthday Matt! 🎉</h1>
      <div className="balloons">
        <div className="balloon balloon1"></div>
        <div className="balloon balloon2"></div>
        <div className="balloon balloon3"></div>
        <div className="balloon balloon4"></div>
        <div className="balloon balloon5"></div>
        <div className="balloon balloon6"></div>
      </div>
      <div className="video-container">
        <iframe
          src="https://drive.google.com/file/d/1kK478FToICfGAJ8i-Du6eYKQHKbwah6R/preview"
          width="800"
          height="480"
          allow="autoplay; encrypted-media; fullscreen"
          title="Birthday Video"
        ></iframe>
      </div>
    </div>
  );
  
};

export default MattIs32;
