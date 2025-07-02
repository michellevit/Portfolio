import React, { useEffect, useState } from "react";
import "./Widgets.css";

const locations = {
  Burnaby: { lat: 49.2485, lon: -122.9805 },
};

function getUvStatus(uv) {
  if (uv < 3)
    return {
      label: "Low",
      note: "No sunscreen required.",
    };
  if (uv < 6)
    return {
      label: "Moderate",
      note: "Use SPF if outside long.",
    };
  if (uv < 8)
    return {
      label: "High",
      note: "Sunscreen and hat advised.",
    };
  return {
    label: "Very High",
    note: "Avoid midday sun. Sunscreen essential.",
  };
}

function UVIndex() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby");
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
        console.error(err);
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
        {uvData && (
          <>
            <p>
              ☀️ <strong>Current UV:</strong> {uvData.uv?.toFixed(1) ?? "N/A"} (
              {status.label})
            </p>

            <div className="widget-bar-container">
              <div
                className="widget-bar-indicator"
                style={{ left: `${(uvData.uv / 11) * 100}%` }}
              />
            </div>
            <div className="widget-bar-label">
              <span>Low</span>
              <span>Very High</span>
            </div>

            <p className="uv-note">{status.note}</p>

            <p>
              🌡️ <strong>UV Max:</strong> {uvData.uv_max?.toFixed(1) ?? "N/A"}{" "}
              at{" "}
              {uvData.uv_max_time
                ? new Date(uvData.uv_max_time).toLocaleTimeString()
                : "N/A"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default UVIndex;
