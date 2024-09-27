import React from "react";
import "./MattIs32.css"; 

const MattIs32 = () => {
  return (
    <div className="birthday-container">
      <div className="confetti"></div>
      <h1 className="birthday-message">🎉 Happy Birthday! 🎉</h1>
      <div className="balloons">
        <div className="balloon balloon1"></div>
        <div className="balloon balloon2"></div>
        <div className="balloon balloon3"></div>
      </div>
      <div className="video-container">
        <video width="800" controls>
          <source src="https://drive.google.com/uc?export=download&id=1uu0iR_LUO4wyxa2f9b64bojxJjWzHjpN" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default MattIs32;
