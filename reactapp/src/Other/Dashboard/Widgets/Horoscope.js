import React, { useEffect, useState } from "react";
import "./Widgets.css";

const zodiacSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

function Horoscope() {
  const [selectedSign, setSelectedSign] = useState("sagittarius");
  const [horoscope, setHoroscope] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const res = await fetch(
          `https://us-central1-portfolio-mfdev.cloudfunctions.net/getHoroscope?sign=${selectedSign}&day=today`
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API ${res.status}: ${text}`);
        }

        const data = await res.json();
        if (!data?.horoscope) throw new Error("Missing horoscope data");
        setHoroscope(data.horoscope);
        setError(null);
      } catch (err) {
        console.warn("🔮 Horoscope fetch error:", err.message);
        setError("Failed to load horoscope.");
        setHoroscope(null);
      }
    };

    fetchHoroscope();
  }, [selectedSign]);

  return (
    <div className="widget">
      <h2>Horoscope</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <select
          className="widget-select"
          value={selectedSign}
          onChange={(e) => setSelectedSign(e.target.value)}
        >
          {zodiacSigns.map((sign) => (
            <option key={sign} value={sign}>
              {sign.charAt(0).toUpperCase() + sign.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="widget-error">{error}</p>
      ) : horoscope ? (
        <p>{horoscope}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Horoscope;
