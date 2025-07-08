import React, { useEffect, useState } from "react";
import "./Widgets.css";
import { useLocation } from "./LocationContext";

function CelestialEvents() {
  const { selected, locations } = useLocation();
  const { lat, lon } = locations[selected];
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://us-central1-portfolio-mfdev.cloudfunctions.net/getCelestialEvents?lat=${lat}&lon=${lon}`
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setEvents(data?.data?.events || []);
      } catch (err) {
        console.error("🌠 Celestial events error:", err.message);
        setError("Error fetching celestial events.");
      }
    };

    fetchEvents();
  }, [lat, lon]);

  return (
    <div className="widget">
      <h2>Celestial Events</h2>
      {error ? (
        <p className="widget-error">{error}</p>
      ) : events.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="widget-list">
          {events.map((e, i) => (
            <li key={i}>
              <strong>{e.type.replace(/_/g, " ")}:</strong> {e.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CelestialEvents;
