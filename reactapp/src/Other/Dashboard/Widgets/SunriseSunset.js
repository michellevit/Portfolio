import React, { useState, useEffect } from "react";
import "./Widgets.css";
import { useLocation } from "./LocationContext";

export default function SunriseSunsetWidget() {
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [error, setError] = useState(null);

  const { selected, locations } = useLocation(); 

  useEffect(() => {
    const loc = locations[selected];
    if (!loc) return;

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${loc.lat}` +
      `&longitude=${loc.lon}` +
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
  }, [selected, locations]); // ✅ re-run on selection change

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
