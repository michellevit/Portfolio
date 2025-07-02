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

  const clientId = "b1b8fa46c8154461bcedc0d1e9ea9a90";
  const redirectUri = "https://michellef.dev/spotify-callback";
  const scopes = "user-top-read";
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;

  const refreshToken = async () => {
    const refresh = localStorage.getItem("spotifyRefreshToken");
    if (!refresh) return;

    try {
      const res = await fetch(
        `https://us-central1-portfolio-mfdev.cloudfunctions.net/refreshSpotifyToken?refresh_token=${refresh}`
      );
      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("spotifyToken", data.access_token);
        localStorage.setItem(
          "spotifyTokenExpiry",
          Date.now() + data.expires_in * 1000
        );
        setToken(data.access_token);
      } else {
        console.error("Failed to refresh token:", data);
      }
    } catch (err) {
      console.error("❌ Error refreshing Spotify token:", err);
    }
  };

  const checkAndSetToken = async () => {
    const storedToken = localStorage.getItem("spotifyToken");
    const expiry = parseInt(localStorage.getItem("spotifyTokenExpiry"), 10);
    const now = Date.now();

    if (storedToken && expiry && now < expiry) {
      setToken(storedToken);
    } else {
      await refreshToken();
    }
  };

  useEffect(() => {
    checkAndSetToken();
  }, []);

  return (
    <div className="widget spotify-widget">
      <h2>Spotify</h2>
      {isLocalhost ? (
        <p className="widget-error">
          Login available only on <strong>michellef.dev</strong>
        </p>
      ) : token ? (
        <>
          <TopTrack token={token} />
          <TopTracks token={token} />
          <TopArtists token={token} />
          <MostPopularSong token={token} />
          <MoodAnalysis token={token} />
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
