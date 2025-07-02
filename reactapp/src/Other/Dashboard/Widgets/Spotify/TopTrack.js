import React, { useEffect, useState } from "react";

const TopTrack = () => {
  const [track, setTrack] = useState(null);
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    const fetchTrack = async () => {
      const res = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=short_term",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setTrack(data.items?.[0]);
    };

    if (token) fetchTrack();
  }, [token]);

  return (
    <>
      <h3>🎵 Top Track This Week</h3>
      {track ? (
        <p>
          {track.name} by {track.artists.map((a) => a.name).join(", ")}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TopTrack;
