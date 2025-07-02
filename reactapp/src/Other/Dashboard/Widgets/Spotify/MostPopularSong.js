import React, { useEffect, useState } from "react";

const MostPopularSong = ({ token }) => {
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?market=US&limit=1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Spotify API error", res.status, await res.text());
          return;
        }

        const { items } = await res.json();
        const firstTrack = items?.[0]?.track;
        if (!firstTrack) {
          console.warn("No top track found in playlist");
          return;
        }

        setSong(firstTrack);
      } catch (err) {
        console.error("🔥 MostPopularSong error:", err);
      }
    };

    if (token) {
      fetchPopular();
    }
  }, [token]);

  return (
    <div className="widget-block">
      <h3>🔥 Most Popular on Spotify</h3>
      {song ? (
        <p>
          {song.name} by {song.artists.map((a) => a.name).join(", ")}
        </p>
      ) : (
        <p>Loading or unavailable...</p>
      )}
    </div>
  );
};

export default MostPopularSong;
