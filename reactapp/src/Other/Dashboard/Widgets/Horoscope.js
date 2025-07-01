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
  const [horoscope, setHoroscope] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      const url = `https://us-central1-portfolio-mfdev.cloudfunctions.net/getHoroscope?sign=${selectedSign}&day=today`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const body = await response.text();
          throw new Error(`Horoscope API failed — ${response.status}: ${body}`);
        }

        const data = await response.json();
        if (!data.horoscope) throw new Error("Missing 'horoscope' field.");
        setHoroscope(data.horoscope);
        setError(null);
      } catch (err) {
        console.warn("Horoscope error:", err);
      }
    };

    fetchHoroscope();
  }, [selectedSign]);

  return (
    <div className="widget">
      <h2>Horoscope</h2>
      <select
        value={selectedSign}
        onChange={(e) => setSelectedSign(e.target.value)}
        className="widget select"
      >
        {zodiacSigns.map((sign) => (
          <option key={sign} value={sign}>
            {sign.charAt(0).toUpperCase() + sign.slice(1)}
          </option>
        ))}
      </select>

      <div className="widget-content">
        {error && (
          <strong>
            {error}
            <br />
          </strong>
        )}
        {horoscope}
      </div>
    </div>
  );
}

export default Horoscope;
