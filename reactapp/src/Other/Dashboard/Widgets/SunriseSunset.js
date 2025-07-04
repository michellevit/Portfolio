// src/Components/Widgets/SunriseSunsetWidget.js

import React, { useState, useEffect } from "react";
import "./Widgets.css";

const LOCATION = { lat: 49.2485, lon: -122.9805 }; // Burnaby

export default function SunriseSunsetWidget() {
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LOCATION.lat}` +
      `&longitude=${LOCATION.lon}` +
      `&daily=sunrise,sunset` +
      `&timezone=auto`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // ISO strings like "2025-07-04T05:13:00"
        const [sr] = data.daily.sunrise;
        const [ss] = data.daily.sunset;
        setSunrise(formatTime(new Date(sr)));
        setSunset(formatTime(new Date(ss)));
      })
      .catch((err) => {
        console.error("Sun times fetch error:", err);
        setError("Couldn’t load sunrise/sunset times.");
      });
  }, []);

  // now shows e.g. "5:13 AM" or "8:47 PM"
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
            <span role="img" aria-label="Sunrise">
              🌅
            </span>
            {sunrise}
          </div>
          |
          <div className="sun-time">
            <span role="img" aria-label="Sunset">
              🌇
            </span>
            {sunset}
          </div>
        </div>
      )}
    </div>
  );
}
