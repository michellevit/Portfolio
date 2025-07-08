import React, { useEffect, useState } from "react";
import "./Widgets.css";

const locations = {
  Burnaby: { lat: 49.2485, lon: -122.9805 },
  Vancouver: { lat: 49.2827, lon: -123.1207 },
};

function getHumidityStatus(humidity) {
  if (humidity < 30) {
    return { label: "Dry", color: "#f44336" };
  }
  if (humidity <= 60) {
    return { label: "Comfortable", color: "#4caf50" };
  }
  return { label: "Humid", color: "#ff9800" };
}

export default function Humidity() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHumidity = async () => {
      const { lat, lon } = locations[selectedLocation];

      try {
        const res = await fetch(
          `https://us-central1-portfolio-mfdev.cloudfunctions.net/getWeather?lat=${lat}&lon=${lon}`
        );
        if (!res.ok) throw new Error("Weather API failed");

        const result = await res.json();
        if (result.humidity === undefined) {
          setError("No humidity data available.");
          setData(null);
        } else {
          setError(null);
          setData(result);
        }
      } catch (err) {
        console.error("💧 Humidity fetch error:", err);
        setError("Failed to load humidity data.");
        setData(null);
      }
    };

    fetchHumidity();
  }, [selectedLocation]);

  const status = data ? getHumidityStatus(data.humidity) : null;

  return (
    <div className="widget humidity-widget">
      <h2>Humidity</h2>

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
        {error ? (
          <p className="widget-error">{error}</p>
        ) : data ? (
          <>
            <p>
              <strong>Humidity:</strong> {data.humidity}%
            </p>

            <div className="widget-bar-container">
              <div
                className="widget-bar-indicator"
                style={{
                  left: `${data.humidity}%`,
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
    </div>
  );
}
