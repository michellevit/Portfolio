const functions = require("firebase-functions");
const axios = require("axios");
const corsLib = require("cors");

// CORS setup
const allowedOrigins = ["http://localhost:3000", "https://michellef.dev"];
const cors = corsLib({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"), false);
    }
  },
});

// Config keys
const ninjasKey = functions.config().ninjas.key;
const uvKey = functions.config().openuv.key;
const stormglassKey = functions.config().stormglass.key;
const visualcrossingKey = functions.config().visualcrossing.key;
const astronomyId = functions.config().astronomy.id;
const astronomyKey = functions.config().astronomy.key;
const spotifyId = functions.config().spotify.id;
const spotifyKey = functions.config().spotify.key;

// Horoscope
exports.getHoroscope = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { sign } = req.query;
    try {
      const result = await axios.get(
        "https://api.api-ninjas.com/v1/horoscope",
        {
          params: { zodiac: sign },
          headers: { "X-Api-Key": ninjasKey },
        }
      );
      res.json(result.data);
    } catch (err) {
      console.error(
        "Horoscope error:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Error retrieving horoscope");
    }
  });
});

// Air Quality
exports.getAirQuality = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).send("Missing lat/lon");
    }

    try {
      const result = await axios.get(
        "https://api.api-ninjas.com/v1/airquality",
        {
          params: { lat, lon },
          headers: { "X-Api-Key": ninjasKey },
        }
      );
      res.json(result.data);
    } catch (err) {
      console.error(
        "Air quality error:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Error retrieving air quality");
    }
  });
});

// UV Index
exports.getUVIndex = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).send("Missing lat/lon");
    }

    try {
      const result = await axios.get("https://api.openuv.io/api/v1/uv", {
        params: { lat, lng: lon },
        headers: { "x-access-token": uvKey },
      });
      res.json(result.data);
    } catch (err) {
      console.error(
        "UV index error:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Failed to fetch UV index");
    }
  });
});

// Tides
exports.getTides = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const lat = req.query.lat;
    const lon = req.query.lon || req.query.lng;
    if (!lat || !lon) {
      console.error("Missing lat/lon:", { lat, lon });
      return res.status(400).send("Missing lat/lon");
    }

    const today = new Date().toISOString().split("T")[0];
    const startISO = `${today}T00:00:00+00:00`;
    const endISO = `${today}T23:59:59+00:00`;

    try {
      const result = await axios.get(
        "https://api.stormglass.io/v2/tide/extremes/point",
        {
          params: { lat, lng: lon, start: startISO, end: endISO },
          headers: { Authorization: stormglassKey },
        }
      );
      res.json(result.data);
    } catch (err) {
      console.error(
        "Tide API error:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Failed to fetch tide data");
    }
  });
});

// Moon Phase
exports.getMoonPhase = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const location = "Vancouver,BC";
    const today = new Date().toISOString().split("T")[0];

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}?unitGroup=metric&key=${visualcrossingKey}&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`;

    try {
      const response = await axios.get(url);
      const day = response.data?.days?.[0];

      if (!day) {
        return res.status(404).send("No moon/sun data found");
      }

      res.json({
        date: day.datetime,
        moonPhase: day.moonphase,
      });
    } catch (err) {
      console.error(
        "Moon phase error:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Failed to fetch moon/sun data");
    }
  });
});

// Celestial Events
exports.getCelestialEvents = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const authString = Buffer.from(`${astronomyId}:${astronomyKey}`).toString(
      "base64"
    );

    const today = new Date().toISOString().split("T")[0];
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    const endDate = oneWeekLater.toISOString().split("T")[0];

    const lat = req.query.lat || "49.2827";
    const lon = req.query.lon || "-123.1207";
    const elevation = "70";

    const url = `https://api.astronomyapi.com/api/v2/bodies/events/moon?latitude=${lat}&longitude=${lon}&elevation=${elevation}&from_date=${today}&to_date=${endDate}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${authString}`,
        },
      });

      res.set("Access-Control-Allow-Origin", "*");
      res.json(response.data);
    } catch (err) {
      console.error(
        "Celestial events error:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Failed to fetch celestial events");
    }
  });
});

// Spotify
exports.getSpotifyToken = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing code");

    const clientId = functions.config().spotify.id;
    const clientSecret = functions.config().spotify.key;
    const redirectUri = "https://michellef.dev/spotify-callback";

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.json(response.data);
    } catch (err) {
      console.error(
        "Spotify token error:",
        err.response ? err.response.data : err.message
      );
      res.status(500).json({ error: "Failed to get Spotify token" });
    }
  });
});
