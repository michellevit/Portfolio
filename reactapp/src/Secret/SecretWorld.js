import React from 'react';
import { Link } from 'react-router-dom';
import './SecretWorld.css'; 
import worldImage from './assets/world.jpg'; 

function SecretWorld() {
  return (
    <div className="secret-world" style={{ textAlign: 'center', padding: '20px' }}>
      {/* <img src={worldImage} alt="Secret World" style={{ maxWidth: '100%', height: 'auto' }} /> */}
      <div className="secret-button-container">
        <Link to="/secret/quiz" className="secret-quiz-button">
          Enter the Secret Quiz
        </Link>
      </div>
    </div>
  );
}

export default SecretWorld;