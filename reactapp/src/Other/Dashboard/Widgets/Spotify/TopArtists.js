import React, { useEffect, useState } from "react";

const timeLabels = {
  short_term: "This Month",
  medium_term: "Past 6 Months",
  long_term: "All Time",
};

const TopArtists = ({ token }) => {
  const [artists, setArtists] = useState({});

  useEffect(() => {
    const fetchArtists = async (range) => {
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setArtists((prev) => ({ ...prev, [range]: data.items }));
      } catch (err) {
        console.error(`🎤 TopArtists (${range}) error:`, err.message);
      }
    };

    if (token) Object.keys(timeLabels).forEach(fetchArtists);
  }, [token]);

  return (
    <div className="widget-block">
      <h3>👩‍🎤 Your Top Artists</h3>
      {Object.entries(timeLabels).map(([range, label]) => (
        <div key={range}>
          <h4>{label}</h4>
          <ol className="widget-list">
            {(artists[range] || []).map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default TopArtists;
