import React, { useEffect, useState } from "react";
import "./Widgets.css";
import locationData from './Data/Locations.json';


function AirQuality() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState({});


useEffect(() => {
  setLocations(locationData);
}, []);

  function getAqiStatus(aqi) {
    if (aqi <= 50) return { label: "Good", color: "#4caf50" };
    if (aqi <= 100) return { label: "Moderate", color: "#ffeb3b" };
    if (aqi <= 150)
      return { label: "Unhealthy for Sensitive Groups", color: "#ff9800" };
    return { label: "Unhealthy", color: "#f44336" };
  }

  const status = data ? getAqiStatus(data.overall_aqi) : null;

  return (
    <div className="widget">
      <h2>Air Quality</h2>

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {Object.keys(locations).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      {error ? (
        <p>{error}</p>
      ) : data && status ? (
        <>
          <p>
            <strong>AQI:</strong> {data.overall_aqi}
          </p>
          <div className="widget-bar-container">
            <div
              className="widget-bar-indicator"
              style={{
                left: `${(data.overall_aqi / 500) * 100}%`,
                backgroundColor: status.color,
              }}
            />
          </div>
          <div className="widget-bar-label">
            <span style={{ color: status.color }}>{status.label}</span>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AirQuality;
