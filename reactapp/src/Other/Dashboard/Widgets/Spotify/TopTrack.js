import React, { useEffect, useState } from "react";

const TopTrack = ({ token }) => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=short_term",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setTrack(data.items?.[0]);
      } catch (err) {
        console.error("🎵 TopTrack error:", err.message);
      }
    };

    if (token) fetchTrack();
  }, [token]);

  return (
    <div className="widget-block">
      <h3>🎵 Top Track - This Week</h3>
      {track ? (
        <p>
          {track.name} by {track.artists.map((a) => a.name).join(", ")}
        </p>
      ) : (
        <p>Loading or unavailable...</p>
      )}
    </div>
  );
};

export default TopTrack;
