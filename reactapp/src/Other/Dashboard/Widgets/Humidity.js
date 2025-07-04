// src/Components/Widgets/Humidity.js
import React, { useEffect, useState } from "react";
import "./Widgets.css";

function Humidity() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Define whatever locations you like here
  const locations = {
    Burnaby: { lat: 49.2485, lon: -122.9805 },
    Vancouver: { lat: 49.2827, lon: -123.1207 },
    // add more as needed…
  };

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

  return (
    <div className="widget">
      <h2>Humidity</h2>

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {Object.keys(locations).map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {error ? (
        <p className="widget-error">{error}</p>
      ) : data ? (
        <>
          <p>
            <strong>Humidity:</strong> {data.humidity}%
          </p>

          {/* bar indicator (0–100%) */}
          <div className="widget-bar-container">
            <div
              className="widget-bar-indicator"
              style={{ left: `${data.humidity}%` }}
            />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Humidity;
