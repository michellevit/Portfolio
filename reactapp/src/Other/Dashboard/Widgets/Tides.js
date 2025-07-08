// src/Other/Dashboard/Widgets/Tides.js

import React, { useEffect, useState } from "react";
import "./Widgets.css";
import locations from "./Data/Locations.json";

function Tides() {
  const firstKey = Object.keys(locations)[0];
  const [selectedLocation, setSelectedLocation] = useState(firstKey);
  const [tides, setTides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTides = async () => {
      const { lat, lon } = locations[selectedLocation];
      const url = `https://us-central1-portfolio-mfdev.cloudfunctions.net/getTides?lat=${lat}&lon=${lon}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const body = await response.text();
          throw new Error(`Tide API failed — ${response.status}: ${body}`);
        }

        const data = await response.json();
        if (!data.data) throw new Error("Missing 'data' field.");
        setTides(data.data);
        setError(null);
      } catch (err) {
        console.warn("Tide error:", err);
        setError("Error loading tide data.");
      }
    };

    fetchTides();
  }, [selectedLocation]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="widget">
      <h2>Tides</h2>

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="widget-select"
      >
        {Object.keys(locations).map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <div className="widget-content">
        {error && <p className="widget-error">{error}</p>}
        {!error && tides.length === 0 && <p>Loading...</p>}
        {!error && tides.length > 0 && (
          <ul className="widget-list">
            {tides.map((tide, idx) => (
              <li key={idx}>
                <strong>
                  {tide.type.charAt(0).toUpperCase() + tide.type.slice(1)}
                </strong>
                : {formatTime(tide.time)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tides;
