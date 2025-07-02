import React, { useEffect, useState } from "react";

const moodLabels = [
  { threshold: 0.7, label: "Energized" },
  { threshold: 0.4, label: "Happy" },
  { threshold: 0.0, label: "Relaxed" },
];

const MoodAnalysis = ({ token }) => {
  const [mood, setMood] = useState(null);

  useEffect(() => {
    const getMood = async () => {
      try {
        // 1) Fetch your top 10 tracks
        const topRes = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!topRes.ok) {
          console.error("Top tracks error", topRes.status, await topRes.text());
          return;
        }
        const topData = await topRes.json();
        if (!topData.items?.length) {
          console.warn("No top tracks found");
          return;
        }

        // 2) Grab their audio features
        const ids = topData.items.map((t) => t.id).join(",");
        const audioRes = await fetch(
          `https://api.spotify.com/v1/audio-features?ids=${ids}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!audioRes.ok) {
          console.error(
            "Audio features error",
            audioRes.status,
            await audioRes.text()
          );
          return;
        }
        const audioData = await audioRes.json();
        const features = audioData.audio_features?.filter(Boolean) || [];
        if (!features.length) {
          console.warn("No audio features found");
          return;
        }

        // 3) Compute averages (in [0,1])
        const avgOf = (key) =>
          features.reduce((sum, f) => sum + (f[key] || 0), 0) / features.length;

        const energy = avgOf("energy");
        const danceability = avgOf("danceability");
        const valence = avgOf("valence");

        // 4) Composite mood score (you can tweak weights)
        const composite = 0.4 * valence + 0.3 * energy + 0.3 * danceability;

        // 5) Pick a label
        const moodLabel =
          moodLabels.find((m) => composite >= m.threshold)?.label || "Neutral";

        setMood({ energy, danceability, valence, composite, moodLabel });
      } catch (err) {
        console.error("🎧 MoodAnalysis error:", err);
      }
    };

    if (token) getMood();
  }, [token]);

  // helper to render a bar
  const Bar = ({ value }) => {
    const pct = Math.round(value * 100);
    return (
      <div className="widget-bar-container">
        <div
          className="widget-bar-indicator"
          style={{ left: `${pct}%` }}
          title={`${pct}%`}
        />
        <div className="widget-bar-label">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    );
  };

  return (
    <div className="widget spotify-widget">
      <h3>🎧 Your Music Mood</h3>
      {mood ? (
        <>
          <p style={{ textAlign: "center", fontWeight: 600 }}>
            Overall: {mood.moodLabel} ({Math.round(mood.composite * 100)}%)
          </p>
          <ul className="widget-list">
            <li>
              🌟 Energy: {Math.round(mood.energy * 100)}%
              <Bar value={mood.energy} />
            </li>
            <li>
              🕺 Danceability: {Math.round(mood.danceability * 100)}%
              <Bar value={mood.danceability} />
            </li>
            <li>
              😊 Positivity: {Math.round(mood.valence * 100)}%
              <Bar value={mood.valence} />
            </li>
          </ul>
        </>
      ) : (
        <p>Loading or unavailable...</p>
      )}
    </div>
  );
};

export default MoodAnalysis;
