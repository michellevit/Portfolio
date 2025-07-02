import React, { useEffect, useState } from "react";

const MoodAnalysis = () => {
  const [mood, setMood] = useState(null);
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    const getMood = async () => {
      try {
        const topRes = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const topData = await topRes.json();
        const ids = topData?.items?.map((t) => t.id).join(",");

        if (!ids) return;

        const audioRes = await fetch(
          `https://api.spotify.com/v1/audio-features?ids=${ids}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const audioData = await audioRes.json();

        const features = audioData?.audio_features || [];
        const avg = (key) =>
          (
            features.reduce((sum, f) => sum + (f?.[key] || 0), 0) /
            features.length
          ).toFixed(2);

        setMood({
          energy: avg("energy"),
          danceability: avg("danceability"),
          valence: avg("valence"),
        });
      } catch (err) {
        console.error("🎧 MoodAnalysis error:", err.message);
      }
    };

    if (token) getMood();
  }, [token]);

  return (
    <div className="widget-block">
      <h3>🎧 Your Music Mood</h3>
      {mood ? (
        <ul className="widget-list">
          <li>🌟 Energy: {mood.energy}</li>
          <li>🕺 Danceability: {mood.danceability}</li>
          <li>😊 Positivity: {mood.valence}</li>
        </ul>
      ) : (
        <p>Loading or unavailable...</p>
      )}
    </div>
  );
};

export default MoodAnalysis;
