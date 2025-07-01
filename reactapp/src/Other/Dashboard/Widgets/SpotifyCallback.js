import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const getToken = async () => {
      try {
        const res = await fetch(
          `https://us-central1-portfolio-mfdev.cloudfunctions.net/getSpotifyToken?code=${code}`
        );
        const data = await res.json();
        console.log("🎧 Spotify token response:", data);
      } catch (err) {
        console.error("🎧 Spotify token fetch error:", err);
      }
    };

    getToken();
  }, []);

  return <p>Authorizing with Spotify...</p>;
}

export default SpotifyCallback;
