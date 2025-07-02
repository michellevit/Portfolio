import React, { useEffect, useState } from "react";

const timeLabels = {
  short_term: "This Month",
  medium_term: "Past 6 Months",
  long_term: "All Time",
};

const TopArtists = () => {
  const [artists, setArtists] = useState({});
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    const fetchArtists = async (range) => {
      const res = await fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setArtists((prev) => ({ ...prev, [range]: data.items }));
    };

    if (token) {
      Object.keys(timeLabels).forEach(fetchArtists);
    }
  }, [token]);

  return (
    <>
      <h3>👩‍🎤 Your Top Artists</h3>
      {Object.entries(timeLabels).map(([range, label]) => (
        <div key={range}>
          <h4>{label}</h4>
          <ol>
            {(artists[range] || []).map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ol>
        </div>
      ))}
    </>
  );
};

export default TopArtists;
