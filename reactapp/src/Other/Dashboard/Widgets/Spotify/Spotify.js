import React, { useEffect, useState } from "react";
import "../Widgets.css";
import TopTrack from "./TopTrack";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import MostPopularSong from "./MostPopularSong";
import MoodAnalysis from "./MoodAnalysis";

const Spotify = () => {
  const isLocalhost = window.location.hostname === "localhost";

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const clientId = "b1b8fa46c8154461bcedc0d1e9ea9a90";
  const redirectUri = "https://michellef.dev/spotify-callback";
  const scopes = "user-top-read";

  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;

  return (
    <div className="widget spotify-widget">
      <h2>Spotify</h2>
      {isLocalhost ? (
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
          Login available only on <strong>michellef.dev</strong>
        </p>
      ) : token ? (
        <>
          <TopTrack />
          <TopTracks />
          <TopArtists />
          <MostPopularSong />
          <MoodAnalysis />
        </>
      ) : (
        <div className="spotify-button">
          <a className="spotify-login-btn" href={loginUrl}>
            Connect to Spotify
          </a>
        </div>
      )}
    </div>
  );
};

export default Spotify;
