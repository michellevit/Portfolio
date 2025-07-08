import React, { useEffect, useState } from "react";
import "./Widgets.css";
import { useLocation } from "./LocationContext";

function AirQuality() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { selected, locations } = useLocation();

  function getAqiStatus(aqi) {
    if (aqi <= 50) return { label: "Good", color: "#4caf50" };
    if (aqi <= 100) return { label: "Moderate", color: "#ffeb3b" };
    if (aqi <= 150)
      return { label: "Unhealthy for Sensitive Groups", color: "#ff9800" };
    return { label: "Unhealthy", color: "#f44336" };
  }

  const status = data ? getAqiStatus(data.overall_aqi) : null;

  useEffect(() => {
    if (!locations[selected]) return;

    const { lat, lon } = locations[selected];
    fetch(
      `https://us-central1-portfolio-mfdev.cloudfunctions.net/getAirQuality?lat=${lat}&lon=${lon}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Air quality API failed");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Air Quality error:", err.message);
        setError("Failed to fetch air quality");
        setData(null);
      });
  }, [selected, locations]);

  return (
    <div className="widget">
      <h2>Air Quality</h2>

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
