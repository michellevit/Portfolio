import React, { useEffect, useState } from "react";
import "./Widgets.css";

function MoonPhase() {
  const [moonData, setMoonData] = useState(null);
  const [error, setError] = useState(null);

  const getMoonEmoji = (value) => {
    if (value === 0) return "🌑"; // New Moon
    if (value > 0 && value < 0.25) return "🌒"; // Waxing Crescent
    if (value === 0.25) return "🌓"; // First Quarter
    if (value > 0.25 && value < 0.5) return "🌔"; // Waxing Gibbous
    if (value === 0.5) return "🌕"; // Full Moon
    if (value > 0.5 && value < 0.75) return "🌖"; // Waning Gibbous
    if (value === 0.75) return "🌗"; // Last Quarter
    if (value > 0.75 && value < 1) return "🌘"; // Waning Crescent
    return "🌑";
  };

  const getMoonLabel = (value) => {
    const labels = [
      "New Moon",
      "Waxing Crescent",
      "First Quarter",
      "Waxing Gibbous",
      "Full Moon",
      "Waning Gibbous",
      "Last Quarter",
      "Waning Crescent",
    ];
    return labels[Math.floor(value * 8) % 8];
  };

  useEffect(() => {
    const fetchMoonData = async () => {
      try {
        const res = await fetch(
          "https://us-central1-portfolio-mfdev.cloudfunctions.net/getMoonPhase"
        );
        if (!res.ok) throw new Error("Failed to fetch moon data");
        const data = await res.json();
        setMoonData(data);
      } catch (err) {
        console.error("🌙 MoonPhase error:", err);
        setError("Could not load moon phase.");
      }
    };

    fetchMoonData();
  }, []);

  return (
    <div className="widget">
      <h2>Moon Phase</h2>
      {error ? (
        <p className="widget-error">{error}</p>
      ) : !moonData ? (
        <p>Loading...</p>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", lineHeight: "2.5rem" }}>
            {getMoonEmoji(moonData.moonPhase)}
          </div>
          <p>
            {getMoonLabel(moonData.moonPhase)}
            <br />
            {Math.round(moonData.moonPhase * 100)}% illumination
          </p>
        </div>
      )}
    </div>
  );
}

export default MoonPhase;
