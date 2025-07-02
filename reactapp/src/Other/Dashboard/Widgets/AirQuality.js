import React, { useEffect, useState } from "react";
import "./Widgets.css";

function AirQuality() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby Mountain");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const locations = {
    "Burnaby Mountain": { lat: 49.2781, lon: -122.9199 },
    "Burnaby Central": { lat: 49.2485, lon: -122.9805 },
    "Jericho Beach": { lat: 49.2735, lon: -123.1947 },
    "White Rock": { lat: 49.0275, lon: -122.8026 },
    Aldergrove: { lat: 49.1045, lon: -122.5138 },
    "Blaine, WA": { lat: 48.9936, lon: -122.747 },
    "Scottsdale, AZ": { lat: 33.6349, lon: -111.8302 },
  };

  useEffect(() => {
    const fetchAirQuality = async () => {
      const { lat, lon } = locations[selectedLocation];

      try {
        const response = await fetch(
          `https://us-central1-portfolio-mfdev.cloudfunctions.net/getAirQuality?lat=${lat}&lon=${lon}`
        );
        if (!response.ok) throw new Error("Air quality API failed");

        const result = await response.json();

        if (!result || result.overall_aqi === undefined) {
          setError("No air quality data found.");
          setData(null);
        } else {
          setError(null);
          setData(result);
        }
      } catch (err) {
        console.error("🌫️ Air quality fetch error:", err);
        setError("Failed to load air quality data.");
        setData(null);
      }
    };

    fetchAirQuality();
  }, [selectedLocation]);

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
