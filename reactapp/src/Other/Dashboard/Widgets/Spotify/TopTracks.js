import React, { useEffect, useState } from "react";

const timeRanges = {
  short_term: "Last 4 Weeks",
  medium_term: "Last 6 Months",
  long_term: "All Time",
};

const TopTracks = ({ token }) => {
  const [tracks, setTracks] = useState({});

  useEffect(() => {
    const fetchTopTracks = async (range) => {
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setTracks((prev) => ({ ...prev, [range]: data.items }));
      } catch (err) {
        console.error(`🎶 TopTracks (${range}) error:`, err.message);
      }
    };

    if (token) Object.keys(timeRanges).forEach(fetchTopTracks);
  }, [token]);

  return (
    <div className="widget-block">
      <h3>🎶 Your Top Tracks</h3>
      {Object.entries(timeRanges).map(([range, label]) => (
        <div key={range}>
          <h4>{label}</h4>
          <ol className="widget-list">
            {(tracks[range] || []).map((track) => (
              <li key={track.id}>
                {track.name} – {track.artists.map((a) => a.name).join(", ")}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default TopTracks;
