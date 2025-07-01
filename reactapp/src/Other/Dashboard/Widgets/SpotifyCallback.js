import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      fetch(
        `https://us-central1-portfolio-mfdev.cloudfunctions.net/getSpotifyToken?code=${code}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("🎧 Spotify access token:", data.access_token);
          localStorage.setItem("spotify_access_token", data.access_token);
          navigate("/dash"); // go back to dashboard after auth
        })
        .catch((err) => {
          console.error("Spotify auth failed", err);
          navigate("/dash");
        });
    }
  }, []);

  return <p>Authorizing with Spotify...</p>;
}

export default SpotifyCallback;
