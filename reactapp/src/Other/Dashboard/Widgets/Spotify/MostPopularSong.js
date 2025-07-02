import React, { useEffect, useState } from "react";

const MostPopularSong = ({ token }) => {
  const [song, setSong] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchPopular = async () => {
      try {
        // 1) Grab only the track name + artists
        const url = new URL(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks"
        );
        url.searchParams.set("market", "US");
        url.searchParams.set("limit", "1");
        url.searchParams.set("fields", "items(track(name,artists(name)))");

        const res = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          const txt = await res.text();
          console.error("Spotify API error:", res.status, txt);
          setError(`API ${res.status}: ${txt}`);
          return;
        }

        const json = await res.json();
        console.debug("👀 playlist‐tracks JSON:", json);

        const track = json.items?.[0]?.track;
        if (!track) {
          console.warn("No track in response");
          setError("No track found in playlist");
          return;
        }

        setSong(track);
      } catch (err) {
        console.error("🔥 MostPopularSong error:", err);
        setError(err.message);
      }
    };

    fetchPopular();
  }, [token]);

  return (
    <div className="widget-block">
      <h3>🔥 Most Popular on Spotify</h3>
      {error ? (
        <p className="widget-error">Error: {error}</p>
      ) : song ? (
        <p>
          {song.name} by {song.artists.map((a) => a.name).join(", ")}
        </p>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
};

export default MostPopularSong;
