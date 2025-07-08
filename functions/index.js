const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const corsLib = require("cors");

admin.initializeApp();
const db = admin.firestore();

// CORS setup
const allowedOrigins = ["https://michellef.dev"];
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
const mySecret = functions.config().private.secret; // secret for widgets (e.g., add LeetCode entry, etc)


function getCacheKey(prefix, lat, lon) {
  const today = new Date().toISOString().split("T")[0];
  return `${prefix}_${lat}_${lon}_${today}`;
}

async function getCachedOrFetch(key, fetchFn) {
  const cached = await db.collection("api_cache").doc(key).get();
  if (cached.exists) return cached.data();

  const data = await fetchFn();
  await db.collection("api_cache").doc(key).set(data);
  return data;
}

function withSecretAuth(handler) {
  return functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      const { secret } = req.body;
      if (secret !== mySecret) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      try {
        await handler(req, res);
      } catch (err) {
        console.error("Handler error:", err);
        res.status(500).json({ error: "Server error" });
      }
    });
  });
}

// Horoscope (no location caching needed)
exports.getHoroscope = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { sign } = req.query;
    try {
      const result = await axios.get("https://api.api-ninjas.com/v1/horoscope", {
        params: { zodiac: sign },
        headers: { "X-Api-Key": ninjasKey },
      });
      res.json(result.data);
    } catch (err) {
      console.error("Horoscope error:", err.response?.data || err.message);
      res.status(500).send("Error retrieving horoscope");
    }
  });
});

// General handler with caching for APIs with lat/lon
const withLocationCaching = (prefix, fetchFunction) =>
  functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      const lat = req.query.lat;
      const lon = req.query.lon || req.query.lng;
      if (!lat || !lon) return res.status(400).send("Missing lat/lon");

      const cacheKey = getCacheKey(prefix, lat, lon);
      try {
        const data = await getCachedOrFetch(cacheKey, () => fetchFunction(lat, lon));
        res.json(data);
      } catch (err) {
        console.error(`${prefix} error:`, err.response?.data || err.message);
        res.status(500).send(`Failed to fetch ${prefix} data`);
      }
    });
  });

exports.getAirQuality = withLocationCaching("airquality", async (lat, lon) => {
  const result = await axios.get("https://api.api-ninjas.com/v1/airquality", {
    params: { lat, lon },
    headers: { "X-Api-Key": ninjasKey },
  });
  return result.data;
});

exports.getWeather = withLocationCaching("weather", async (lat, lon) => {
  const result = await axios.get("https://api.api-ninjas.com/v1/weather", {
    params: { lat, lon },
    headers: { "X-Api-Key": ninjasKey },
  });
  return result.data;
});

exports.getUVIndex = withLocationCaching("uvindex", async (lat, lon) => {
  const result = await axios.get("https://api.openuv.io/api/v1/uv", {
    params: { lat, lng: lon },
    headers: { "x-access-token": uvKey },
  });
  return result.data;
});

exports.getTides = withLocationCaching("tides", async (lat, lon) => {
  const today = new Date().toISOString().split("T")[0];
  const startISO = `${today}T00:00:00+00:00`;
  const endISO = `${today}T23:59:59+00:00`;
  const result = await axios.get("https://api.stormglass.io/v2/tide/extremes/point", {
    params: { lat, lng: lon, start: startISO, end: endISO },
    headers: { Authorization: stormglassKey },
  });
  return result.data;
});

exports.getMoonPhase = withLocationCaching("moonphase", async () => {
  const location = "Vancouver,BC";
  const today = new Date().toISOString().split("T")[0];
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}?unitGroup=metric&key=${visualcrossingKey}&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`;
  const response = await axios.get(url);
  const day = response.data?.days?.[0];
  if (!day) throw new Error("No moon/sun data found");
  return { date: day.datetime, moonPhase: day.moonphase };
});

exports.getCelestialEvents = withLocationCaching("celestial", async (lat, lon) => {
  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const endDate = oneWeekLater.toISOString().split("T")[0];

  const elevation = "70";
  const authString = Buffer.from(`${astronomyId}:${astronomyKey}`).toString("base64");

  const url = `https://api.astronomyapi.com/api/v2/bodies/events/moon?latitude=${lat}&longitude=${lon}&elevation=${elevation}&from_date=${today}&to_date=${endDate}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Basic ${authString}` },
  });
  return response.data;
});

// Spotify
exports.getSpotifyToken = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing code");

    const credentials = Buffer.from(`${spotifyId}:${spotifyKey}`).toString("base64");
    const redirectUri = "https://michellef.dev/spotify-callback";

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

      const refreshToken = response.data.refresh_token;

      // Get app-level token for public data
      const clientCreds = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.json({
        ...response.data,
        public_access_token: clientCreds.data.access_token,
      });
    } catch (err) {
      console.error("Spotify token error:", err.response?.data || err.message);
      res.status(500).json({ error: "Failed to get Spotify token" });
    }
  });
});


// Add LeetCode Entry (LeetCode)

exports.submitLeetcode = withSecretAuth(async (req, res) => {
  const { number, question, difficulty } = req.body;

  const today = new Date().toISOString().split("T")[0];

  const existing = await db.collection("leetcode")
    .where("number", "==", number)
    .get();

  if (!existing.empty) {
    const doc = existing.docs[0];
    const prev = doc.data();
    await doc.ref.update({
      attempts: Number(prev.attempts) + 1,
      date: today,
    });
    return res.json({ message: "✅ Updated existing entry" });
  }

  await db.collection("leetcode").add({
    number,
    question,
    difficulty,
    attempts: 1,
    date: today,
  });

  res.json({ message: "✅ Added new LeetCode entry" });
});
