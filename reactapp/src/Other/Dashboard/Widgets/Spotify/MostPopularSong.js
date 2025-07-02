import React, { useEffect, useState } from "react";

const MostPopularSong = () => {
  const [song, setSong] = useState(null);
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    const fetchPopular = async () => {
      const res = await fetch(
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      const firstTrack = data.tracks.items[0].track;
      setSong(firstTrack);
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
        <p>Loading...</p>
      )}
    </>
  );
};

export default MostPopularSong;
