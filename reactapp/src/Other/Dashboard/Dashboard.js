import React from "react";
import Masonry from "react-masonry-css";
import "./Dashboard.css";
import {
  LocationProvider,
} from "./Widgets/LocationContext";
import AirQuality from "./Widgets/AirQuality";
import CelestialEvents from "./Widgets/CelestialEvents";
import Horoscope from "./Widgets/Horoscope";
import Humidity from "./Widgets/Humidity";
import Kindle from "./Widgets/Kindle";
import LeetCode from "./Widgets/LeetCode";
import MoonPhase from "./Widgets/MoonPhase";
import Quiz from "./Widgets/Quiz";
import Quotes from "./Widgets/Quotes";
import Shortcuts from "./Widgets/Shortcuts";
import Spotify from "./Widgets/Spotify/Spotify";
import SunriseSunset from "./Widgets/SunriseSunset";
import Tides from "./Widgets/Tides";
import UVIndex from "./Widgets/UVIndex";
import Weather from "./Widgets/Weather";
import YearProgress from "./Widgets/YearProgress";

function Dashboard() {
  const breakpointColumnsObj = {
    default: 3,
    1000: 2,
    600: 1,
  };

  return (
    <div className="dashboard">
      <LocationProvider>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <AirQuality />
          <CelestialEvents />
          <Horoscope />
          <Humidity />
          <Kindle />
          <LeetCode />
          <MoonPhase />
          <Quiz />
          <Quotes />
          <Shortcuts />
          <Spotify />
          <SunriseSunset />
          <Tides />
          <UVIndex />
          <Weather />
          <YearProgress />
        </Masonry>
      </LocationProvider>
    </div>
  );
}

export default Dashboard;
