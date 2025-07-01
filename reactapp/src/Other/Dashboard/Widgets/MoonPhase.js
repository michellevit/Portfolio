import React, { useEffect, useState } from "react";
import "./Widgets.css";

function MoonPhase() {
  const [moonData, setMoonData] = useState(null);
  const [error, setError] = useState(null);

  const getMoonEmoji = (value) => {
    const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
    const index = Math.round(value * 8) % 8;
    return phases[index];
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
    const index = Math.round(value * 8) % 8;
    return labels[index];
  };

  useEffect(() => {
    fetch("https://us-central1-portfolio-mfdev.cloudfunctions.net/getMoonPhase")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch moon data");
        return res.json();
      })
      .then((data) => {
        setMoonData(data);
      })
      .catch((err) => {
        console.error("🌙 MoonPhase widget error:", err);
        setError("Could not load moon phase.");
      });
  }, []);

  return (
    <div className="widget">
      <h2>Moon Phase</h2>
      <div className="widget-content">
        {error && error}
        {!error && !moonData && "Loading..."}
        {moonData && (
          <>
            {getMoonEmoji(moonData.moonPhase)}{" "}
            {getMoonLabel(moonData.moonPhase)}
            <br />
            {(moonData.moonPhase * 100).toFixed(0)}% illumination
          </>
        )}
      </div>
    </div>
  );
}

export default MoonPhase;
