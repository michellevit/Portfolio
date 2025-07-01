import React, { useEffect, useState } from "react";
import "./Widgets.css";

const locations = {
  "Burnaby Mountain": { lat: 49.2781, lon: -122.9199 },
  "Burnaby Central": { lat: 49.2485, lon: -122.9805 },
  Kitsilano: { lat: 49.2681, lon: -123.155 },
  "Jericho Beach": { lat: 49.2735, lon: -123.1947 },
  "Scottsdale, AZ": { lat: 33.6349, lon: -111.8302 },
  "White Rock": { lat: 49.0275, lon: -122.8026 },
  "Blaine, WA": { lat: 48.9936, lon: -122.747 },
  Aldergrove: { lat: 49.1045, lon: -122.5138 },
};

function Weather() {
  const [selectedLocation, setSelectedLocation] = useState("Burnaby Mountain");
  const [forecast, setForecast] = useState([]);
  const [sunriseTime, setSunriseTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  const [error, setError] = useState(null);
  const now = new Date();
  const currentHour = now.getHours();
  const currentEntry = forecast.find((e) => e.hour === currentHour);

  const getEmoji = (code, hour, sunriseHour, sunsetHour) => {
    const isNight = hour < sunriseHour || hour >= sunsetHour;

    if (code === 0) return isNight ? "🌙" : "☀️";
    if ([1, 2].includes(code)) return isNight ? "🌙" : "🌤️";
    if (code === 3) return "☁️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 57) return "🌦️";
    if (code >= 61 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "🌨️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";
    return "❓";
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const { lat, lon } = locations[selectedLocation];

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=sunrise,sunset&timezone=auto`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const { time, temperature_2m, weathercode } = data.hourly;
        const sunrise = new Date(data.daily.sunrise[0]);
        const sunset = new Date(data.daily.sunset[0]);
        const sunriseHour = sunrise.getHours();
        const sunsetHour = sunset.getHours();

        const formatTime = (dateObj) =>
          `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

        setSunriseTime(formatTime(sunrise));
        setSunsetTime(formatTime(sunset));

        const todayForecast = [];

        for (let i = 0; i < time.length; i++) {
          if (time[i].startsWith(today)) {
            const hour = new Date(time[i]).getHours();
            todayForecast.push({
              hour,
              temp: temperature_2m[i],
              code: weathercode[i],
              emoji: getEmoji(weathercode[i], hour, sunriseHour, sunsetHour),
            });
          }
        }

        setForecast(todayForecast);
      })
      .catch((err) => {
        console.error("Weather fetch error:", err);
        setError("Failed to load weather.");
      });
  }, [selectedLocation]);

  const groupByPeriod = (entries) => ({
    Twilight: entries.filter((e) => e.hour >= 0 && e.hour < 6),
    Morning: entries.filter((e) => e.hour >= 6 && e.hour < 12),
    Afternoon: entries.filter((e) => e.hour >= 12 && e.hour < 18),
    Night: entries.filter((e) => e.hour >= 18),
  });

  const grouped = groupByPeriod(forecast);

  return (
    <div className="widget weather-widget">
      <h2>Weather</h2>

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="widget select"
      >
        {Object.keys(locations).map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <div className="widget-content">
        {error && error}
        {!error && forecast.length === 0 && "Loading..."}
        {forecast.length > 0 && (
          <>
            <div className="sun-times">
              {currentEntry && (
                <>
                  {currentEntry.emoji} Current:{" "}
                  <strong>{Math.round(currentEntry.temp)}°C</strong>
                </>
              )}
              <br />
              🌅 Sunrise: <strong>{sunriseTime}</strong>
              <br />
              🌇 Sunset: <strong>{sunsetTime}</strong>
              <br />
            </div>

            {["Twilight", "Morning", "Afternoon", "Night"].map((period) => (
              <div key={period} className="period">
                <div className="period-title">{period}</div>
                <ul className="period-list">
                  {grouped[period].map((entry, idx) => (
                    <li key={idx} className="period-item">
                      <span>
                        {entry.hour.toString().padStart(2, "0")}:00{" "}
                        {entry.emoji}
                      </span>
                      <span>
                        {entry.hour === currentHour ? (
                          <strong>{Math.round(entry.temp)}°C</strong>
                        ) : (
                          `${Math.round(entry.temp)}°C`
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
