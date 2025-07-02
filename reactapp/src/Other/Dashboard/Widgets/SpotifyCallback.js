import React, { useEffect } from "react";

const SpotifyCallback = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const getToken = async () => {
      try {
        const res = await fetch(
          `https://us-central1-portfolio-mfdev.cloudfunctions.net/getSpotifyToken?code=${code}`
        );
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("Invalid JSON from server:", text);
          throw err;
        }
        console.log("Spotify token response:", data);

        if (data.access_token) {
          // ✅ Save token and redirect
          localStorage.setItem("spotifyToken", data.access_token);
          window.location.href = "/dash"; // or "/dashboard" or wherever
        } else {
          console.error("No access token received:", data);
        }
      } catch (err) {
        console.error("🎧 Spotify token fetch error:", err);
      }
    };

    getToken();
  }, []);

  return <p>Authorizing with Spotify...</p>;
};

export default SpotifyCallback;
