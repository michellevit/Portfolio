import React, { useEffect, useState } from "react";

const MoodAnalysis = () => {
  const [mood, setMood] = useState(null);
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    const getMood = async () => {
      const topRes = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const topData = await topRes.json();
      const ids = topData.items.map((t) => t.id).join(",");

      const audioRes = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${ids}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const audioData = await audioRes.json();

      const avg = (key) =>
        (
          audioData.audio_features.reduce((sum, f) => sum + f[key], 0) /
          audioData.audio_features.length
        ).toFixed(2);

      setMood({
        energy: avg("energy"),
        danceability: avg("danceability"),
        valence: avg("valence"),
      });
    };

    if (token) getMood();
  }, [token]);

  return (
    <>
      <h3>🎧 Your Music Mood</h3>
      {mood ? (
        <ul>
          <li>🌟 Energy: {mood.energy}</li>
          <li>🕺 Danceability: {mood.danceability}</li>
          <li>😊 Positivity: {mood.valence}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MoodAnalysis;
