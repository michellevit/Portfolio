import React, { useEffect, useState } from "react";
import "./Widgets.css";
import { useLocation } from "./LocationContext";

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

function Weather() {
  const [forecast, setForecast] = useState([]);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [error, setError] = useState(null);

  const { selected, locations } = useLocation(); 

  const now = new Date();
  const currentHour = now.getHours();
  const currentEntry = forecast.find((e) => e.hour === currentHour);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const { lat, lon } = locations[selected];

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=sunrise,sunset&timezone=auto`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const { time, temperature_2m, weathercode } = data.hourly;
        const sunriseDate = new Date(data.daily.sunrise[0]);
        const sunsetDate = new Date(data.daily.sunset[0]);

        setSunrise(formatTime(sunriseDate));
        setSunset(formatTime(sunsetDate));

        const sunriseHour = sunriseDate.getHours();
        const sunsetHour = sunsetDate.getHours();

        const hourlyForecast = time
          .map((t, i) => {
            if (!t.startsWith(today)) return null;
            const hour = new Date(t).getHours();
            return {
              hour,
              temp: temperature_2m[i],
              emoji: getEmoji(weathercode[i], hour, sunriseHour, sunsetHour),
            };
          })
          .filter(Boolean);

        setForecast(hourlyForecast);
        setError(null);
      })
      .catch((err) => {
        console.error("Weather fetch error:", err);
        setError("Failed to load weather.");
        setForecast([]);
      });
  }, [selected, locations]); // ✅ trigger refresh on global location change

  const formatTime = (date) =>
    `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

  const groupByPeriod = (entries) => ({
    Twilight: entries.filter((e) => e.hour < 6),
    Morning: entries.filter((e) => e.hour >= 6 && e.hour < 12),
    Afternoon: entries.filter((e) => e.hour >= 12 && e.hour < 18),
    Night: entries.filter((e) => e.hour >= 18),
  });

  const grouped = groupByPeriod(forecast);

  return (
    <div className="widget">
      <h2>Weather</h2>

      <div className="widget-content">
        {error && <p className="widget-error">{error}</p>}
        {!error && forecast.length === 0 && <p>Loading...</p>}

        {forecast.length > 0 && (
          <>
            <div className="weather-current">
              {currentEntry && (
                <>
                  {currentEntry.emoji} Current:{" "}
                  <strong>{Math.round(currentEntry.temp)}°C</strong>
                </>
              )}
            </div>

            <div className="weather-periods">
              {Object.entries(grouped).map(([period, entries]) => {
                const allPast = entries.every((e) => e.hour < currentHour);
                const periodClass = `weather-period-group${
                  allPast ? " weather-past-entry" : ""
                }`;

                return (
                  <div key={period} className={periodClass}>
                    <h3>{period}</h3>
                    <ul className="weather-period-list">
                      {entries.map((entry, idx) => {
                        const isNow = entry.hour === currentHour;
                        const itemClass = [
                          "weather-period-item",
                          isNow && "weather-current-entry",
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (
                          <li key={idx} className={itemClass}>
                            <span className="weather-time">
                              {entry.hour.toString().padStart(2, "0")}:00{" "}
                              {entry.emoji}
                            </span>
                            <span className="weather-temp">
                              {Math.round(entry.temp)}°C
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
