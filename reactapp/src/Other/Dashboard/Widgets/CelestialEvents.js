import React, { useEffect, useState } from "react";
import "./Widgets.css";

function CelestialEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const url = `https://us-central1-portfolio-mfdev.cloudfunctions.net/getCelestialEvents`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setEvents(data.data || []);
      } catch (err) {
        console.error("🌠 Celestial events error:", err);
        setError("Error fetching celestial events.");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="widget">
      <h2>Celestial Events</h2>
      <div className="widget-content">
        {error && <p>{error}</p>}
        {!error && events.length === 0 && <p>Loading...</p>}
        <ul className="widget-list">
          {events.map((e, i) => (
            <li key={i}>
              <strong>{e.type.replace("_", " ")}:</strong> {e.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CelestialEvents;
