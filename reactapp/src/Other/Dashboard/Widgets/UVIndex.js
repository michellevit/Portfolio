// src/Components/Widgets/UVIndex.js

import React, { useEffect, useState } from "react";
import "./Widgets.css";
import locations from "./Data/Locations.json"; // 🔸 Import from JSON

function getUvStatus(uv) {
  if (uv < 3) {
    return { label: "Low", note: "No sunscreen required.", color: "#4caf50" };
  }
  if (uv < 6) {
    return {
      label: "Moderate",
      note: "Use SPF if outside long.",
      color: "#ffeb3b",
    };
  }
  if (uv < 8) {
    return {
      label: "High",
      note: "Sunscreen and hat advised.",
      color: "#ff9800",
    };
  }
  if (uv < 11) {
    return {
      label: "Very High",
      note: "Avoid midday sun. Sunscreen essential.",
      color: "#f44336",
    };
  }
  return {
    label: "Extreme",
    note: "Take all precautions! UV radiation is extreme.",
    color: "#9c27b0",
  };
}

export default function UVIndex() {
  const firstKey = Object.keys(locations)[0]; // 🔸 Default to first key
  const [selectedLocation, setSelectedLocation] = useState(firstKey);
  const [uvData, setUvData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { lat, lon } = locations[selectedLocation];
    fetch(
      `https://us-central1-portfolio-mfdev.cloudfunctions.net/getUVIndex?lat=${lat}&lon=${lon}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        setUvData(data.result);
        setError(null);
      })
      .catch((err) => {
        console.error("UV fetch error:", err);
        setError("Failed to fetch UV data.");
        setUvData(null);
      });
  }, [selectedLocation]);

  const status = uvData ? getUvStatus(uvData.uv) : null;

  return (
    <div className="widget">
      <h2>UV Index</h2>
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
        {!error && !uvData && <p>Loading...</p>}
        {uvData && status && (
          <>
            <p>
              ☀️ <strong>Current UV:</strong> {uvData.uv.toFixed(1)}{" "}
              <span style={{ color: status.color, fontWeight: "600" }}>
                ({status.label})
              </span>
            </p>

            <div className="widget-bar-container">
              <div
                className="widget-bar-indicator"
                style={{
                  left: `${(uvData.uv / 11) * 100}%`,
                  backgroundColor: status.color,
                }}
              />
            </div>
            <div className="widget-bar-label">
              <span style={{ color: status.color }}>{status.label}</span>
            </div>

            <p className="uv-note">{status.note}</p>

            <p>
              🌡️ <strong>UV Max:</strong> {uvData.uv_max.toFixed(1)} at{" "}
              {uvData.uv_max_time
                ? new Date(uvData.uv_max_time).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
