// src/Other/Dashboard/Widgets/Spotify.js

import React from "react";
import "./Widgets.css";

const Spotify = () => {
  const isLocalhost = window.location.hostname === "localhost";

  const clientId = "b1b8fa46c8154461bcedc0d1e9ea9a90";
  const redirectUri = "https://michellef.dev/spotify-callback";
  const scopes = "user-top-read";

  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;

  return (
    <div className="widget">
      <h2>🎵 Spotify</h2>
      {isLocalhost ? (
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
          Login available only on <strong>michellef.dev</strong>
        </p>
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
