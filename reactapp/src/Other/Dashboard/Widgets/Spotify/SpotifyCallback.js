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

        console.log("🎧 Spotify token response:", data);

        if (data.access_token) {
          localStorage.setItem("spotifyToken", data.access_token);
          localStorage.setItem("spotifyRefreshToken", data.refresh_token);
          localStorage.setItem(
            "spotifyTokenExpiry",
            Date.now() + data.expires_in * 1000 // in ms
          );
          window.location.href = "/dash"; // redirect back to dashboard
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
