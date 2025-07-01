import React, { useEffect, useState } from "react";
import "./Widgets.css";

const locations = {
  "Burnaby Mountain": { lat: 49.2781, lon: -122.9199 },
  "Jericho Beach": { lat: 49.2735, lon: -123.1947 },
  "Scottsdale, Arizona": { lat: 33.6349, lon: -111.8302 },
};

function getUvStatus(uv) {
  if (uv < 3)
    return { label: "Low", note: "No protection needed", color: "#a8e6a1" };
  if (uv < 6)
    return {
      label: "Moderate",
      note: "Use SPF if outside long",
      color: "#fff176",
    };
  if (uv < 8)
    return { label: "High", note: "Sunscreen + hat advised", color: "#ffb74d" };
  return {
    label: "Very High",
    note: "Stay in shade during midday",
    color: "#f48fb1",
  };
}

function UVIndex() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby Mountain");
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
        className="widget select"
      >
        {Object.keys(locations).map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {error && <p>{error}</p>}
      {uvData && (
        <div className="widget-content">
          <p>
            ☀️ <strong>Current UV:</strong> {uvData.uv?.toFixed(1) ?? "N/A"} (
            {status.label})
          </p>
          <div className="uv-bar-container">
            <div
              className="uv-indicator"
              style={{
                left: `${(uvData.uv / 11) * 100}%`,
              }}
            />
          </div>
          <div className="uv-label">
            <span>Low</span>
            <span>Very High</span>
          </div>
          <p
            style={{
              fontStyle: "italic",
              fontSize: "0.7rem",
              marginTop: "0.25rem",
              textAlign: "center",
            }}
          >
            {status.note}
          </p>
          <p>
            🌡️ <strong>UV Max:</strong> {uvData.uv_max?.toFixed(1) ?? "N/A"} at{" "}
            {uvData.uv_max_time
              ? new Date(uvData.uv_max_time).toLocaleTimeString()
              : "N/A"}
          </p>
          <p>
            🧪 <strong>Ozone:</strong> {uvData.ozone ?? "N/A"} DU
          </p>
        </div>
      )}
    </div>
  );
}

export default UVIndex;
