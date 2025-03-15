import React, { useState } from "react";
import "./Door.css";

const Door = ({ id, label, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDoor = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="door-container" id={id}>
            <div className={`door-wrapper ${isOpen ? "open" : "closed"}`}>
                <div className={`door ${isOpen ? "open" : ""}`}>
                    <div className="door-label">{label}</div>
                    <div className="door-knob"></div>
                </div>
                <div className={`room ${isOpen ? "open" : ""}`}>{description}</div>
            </div>
            <div className="button-wrapper">
                <button className="door-button" onClick={toggleDoor}>
                    {isOpen ? "Close" : "Open"}
                </button>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="container">
            <Door id="door1" label="Determinism" description="You see nothing but an empty white void." />
            <Door id="door2" label="Free Will" description="A single flickering light bulb swings above." />
        </div>
    );
};

export default App;
