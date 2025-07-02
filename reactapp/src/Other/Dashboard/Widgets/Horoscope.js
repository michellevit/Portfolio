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

function getCurrentZodiacSign() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "pisces";

  return "aries"; // fallback
}

function Horoscope() {
  const [selectedSign, setSelectedSign] = useState(getCurrentZodiacSign());
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
        <p className="horoscope-text">{horoscope}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Horoscope;
