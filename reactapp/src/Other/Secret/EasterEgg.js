import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EasterEgg.css'; 
import egg1 from './assets/eggs/egg1.png'
import egg2 from './assets/eggs/egg2.png'
import egg3 from './assets/eggs/egg3.png'

const eggImages = [egg1, egg2, egg3];


function getNavbarHeight() {
    const navbar = document.querySelector('.navbar-container');
    return navbar ? navbar.offsetHeight : 0;
  }

function getRandomPosition(isMobile) {
    const edgeOffset = 20;
    const navbarHeight = getNavbarHeight(); 
    const maxY = isMobile ? window.innerHeight / 2 : window.innerHeight - navbarHeight;
    const maxX = window.innerWidth;

    // Decide to place on the bottom or on the sides
    if (Math.random() > 0.66) {
    // Position along the bottom
    return {
    top: maxY - edgeOffset,
    left: Math.random() * (maxX - 2 * edgeOffset) + edgeOffset
    };
    } else {
    // Position along the sides
    if (Math.random() > 0.5) {
    // Left side
    return {
        top: Math.random() * (maxY - navbarHeight - 2 * edgeOffset) + navbarHeight + edgeOffset,
        left: edgeOffset
    };
    } else {
    // Right side
    return {
        top: Math.random() * (maxY - navbarHeight - 2 * edgeOffset) + navbarHeight + edgeOffset,
        left: maxX - edgeOffset - 30 
    };
    }
    }
}
  
function EasterEgg() {
    const navigate = useNavigate();  
    const [position, setPosition] = useState(getRandomPosition(window.innerWidth <= 768));
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      // Load a random image from the array
      setImageUrl(eggImages[Math.floor(Math.random() * eggImages.length)]);
  
      const handleResize = () => {
        setPosition(getRandomPosition(window.innerWidth <= 768));
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <img
        src={imageUrl}
        className="easter-egg"
        style={{ position: 'absolute', top: position.top, left: position.left }}
        onClick={() => navigate('/secret')}
        alt="Easter Egg"
        id="nice-work-detective"
      />
    );
  }
  

export default EasterEgg;