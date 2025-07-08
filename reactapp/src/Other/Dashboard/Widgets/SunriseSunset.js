// src/Components/Widgets/SunriseSunset.js

import React, { useState, useEffect } from "react";
import "./Widgets.css";
import locations from "./Data/Locations.json";

export default function SunriseSunsetWidget() {
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [error, setError] = useState(null);

  const firstKey = Object.keys(locations)[0]; // Set default as first entry in JSON
  const location = locations[firstKey];

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${location.lat}` +
      `&longitude=${location.lon}` +
      `&daily=sunrise,sunset` +
      `&timezone=auto`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const [sr] = data.daily.sunrise;
        const [ss] = data.daily.sunset;
        setSunrise(formatTime(new Date(sr)));
        setSunset(formatTime(new Date(ss)));
      })
      .catch((err) => {
        console.error("Sun times fetch error:", err);
        setError("Couldn’t load sunrise/sunset times.");
      });
  }, [location]);

  const formatTime = (date) =>
    date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="widget">
      <h2>Sunrise &amp; Sunset</h2>

      {error ? (
        <p className="widget-error">{error}</p>
      ) : !sunrise || !sunset ? (
        <p>Loading…</p>
      ) : (
        <div className="sun-times">
          <div className="sun-time">
            <span role="img" aria-label="Sunrise">🌅</span> {sunrise}
          </div>
          |
          <div className="sun-time">
            <span role="img" aria-label="Sunset">🌇</span> {sunset}
          </div>
        </div>
      )}
    </div>
  );
}
