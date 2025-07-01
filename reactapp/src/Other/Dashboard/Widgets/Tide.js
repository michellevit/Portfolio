import React, { useEffect, useState } from "react";
import "./Widgets.css";

function Tide() {
  const [tides, setTides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTides = async () => {
      const url = `https://us-central1-portfolio-mfdev.cloudfunctions.net/getTides?lat=49.2827&lon=-123.1207`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const body = await response.text();
          throw new Error(`Tide API failed — ${response.status}: ${body}`);
        }

        const data = await response.json();
        if (!data.data) throw new Error("Missing 'data' field.");
        setTides(data.data);
        setError(null);
      } catch (err) {
        console.warn("Tide error:", err);
        setError("Error loading tide data.");
      }
    };

    fetchTides();
  }, []);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="widget">
      <h2>Tide</h2>

      <div className="widget-content">
        {error && <p className="widget-error">{error}</p>}
        {!error && tides.length === 0 && <p>Loading...</p>}
        {!error && tides.length > 0 && (
          <ul className="widget-list">
            {tides.map((tide, idx) => (
              <li key={idx}>
                <strong>
                  {tide.type.charAt(0).toUpperCase() + tide.type.slice(1)}
                </strong>
                : {formatTime(tide.time)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tide;
