import React, { useEffect, useState } from "react";

const MostPopularSong = () => {
  const [song, setSong] = useState(null);
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch playlist: ${res.status}`);
        }

        const data = await res.json();
        const firstTrack = data?.tracks?.items?.[0]?.track;

        if (firstTrack) {
          setSong(firstTrack);
        } else {
          console.warn("No track data found");
        }
      } catch (err) {
        console.error("🔥 MostPopularSong error:", err.message);
      }
    };

    if (token) fetchPopular();
  }, [token]);

  return (
    <>
      <h3>🔥 Most Popular on Spotify</h3>
      {song ? (
        <p>
          {song.name} by {song.artists.map((a) => a.name).join(", ")}
        </p>
      ) : (
        <p>Loading or unavailable...</p>
      )}
    </>
  );
};

export default MostPopularSong;
