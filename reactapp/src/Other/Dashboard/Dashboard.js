import React from "react";
import Masonry from "react-masonry-css";
import "./Dashboard.css";
import AirQuality from "./Widgets/AirQuality";
import CelestialEvents from "./Widgets/CelestialEvents";
import Horoscope from "./Widgets/Horoscope";
import Humidity from "./Widgets/Humidity";
import MoonPhase from "./Widgets/MoonPhase";
import Quotes from "./Widgets/Quotes";
import Kindle from "./Widgets/Kindle";
import Spotify from "./Widgets/Spotify/Spotify";
import SunriseSunset from "./Widgets/SunriseSunset";
import Tides from "./Widgets/Tides";
import UVIndex from "./Widgets/UVIndex";
import Weather from "./Widgets/Weather";

function Dashboard() {
  const breakpointColumnsObj = {
    default: 3,
    1000: 2,
    600: 1,
  };

  return (
    <div className="dashboard">
      {/* <h1>🌞 Daily Dashboard</h1> */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <Weather />
        <SunriseSunset />
        <Humidity />
        <UVIndex />
        <AirQuality />
        <Tides />
        <MoonPhase />
        <CelestialEvents />
        <Quotes />
        <Kindle />
        <Horoscope />
        <Spotify />
      </Masonry>
    </div>
  );
}

export default Dashboard;
