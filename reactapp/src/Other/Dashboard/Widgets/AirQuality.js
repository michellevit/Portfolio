import React, { useEffect, useState } from "react";
import "./Widgets.css";

function AirQuality() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby Mountain");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const locations = {
    "Burnaby Mountain": { lat: 49.2781, lon: -122.9199 },
    "Burnaby Central": { lat: 49.2485, lon: -122.9805 },
    Kitsilano: { lat: 49.2681, lon: -123.155 },
    "Jericho Beach": { lat: 49.2735, lon: -123.1947 },
    "Scottsdale, Arizona": { lat: 33.6349, lon: -111.8302 },
    "White Rock, BC": { lat: 49.0275, lon: -122.8026 },
    "Blaine, WA": { lat: 48.9936, lon: -122.747 },
  };

  const fetchAirQuality = async () => {
    const { lat, lon } = locations[selectedLocation];

    try {
      const response = await fetch(
        `https://us-central1-portfolio-mfdev.cloudfunctions.net/getAirQuality?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) throw new Error("Air quality API failed");
      const result = await response.json();

      // Check if data exists and has AQI info
      if (!result || result.overall_aqi === undefined) {
        setError("No air quality data found for this location.");
        setData(null);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching air quality:", err);
      setError("Failed to load air quality data.");
      setData(null);
    }
  };

  useEffect(() => {
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
        className="widget select"
      >
        {Object.keys(locations).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      {error ? (
        <div>{error}</div>
      ) : data ? (
        <div className="widget-content">
          {data && status && (
            <div style={{ marginBottom: "1rem" }}>
              <strong>AQI:</strong> {data.overall_aqi}
              <div className="aqi-bar-container">
                <div
                  className="aqi-indicator"
                  style={{
                    left: `${(data.overall_aqi / 500) * 100}%`,
                  }}
                />
              </div>
              <div className="aqi-label">
                <span style={{ color: status.color }}>{status.label}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AirQuality;
