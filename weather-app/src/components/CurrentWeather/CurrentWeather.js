import React, { Component } from "react";
import PropTypes from "prop-types";

import CurrentTempWidget from "./CurrentTempWidget/CurrentTempWidget";
import CurrentStatsWidget from "./CurrentStatsWidget/CurrentStatsWidget";

import styles from "./CurrentWeather.scss";

const CurrentWeather = ({
  currentWeather,
  currentCityBackground,
  currentCity
}) => {
  return (
    <div className={styles.Container}>
      <CurrentTempWidget
        key={currentCity}
        currentTemp={currentWeather}
        currentCityBackground={currentCityBackground}
        currentCity={currentCity}
      />
      <CurrentStatsWidget
        currentStats={currentWeather}
        currentCityBackground={currentCityBackground}
      />
    </div>
  );
};

CurrentWeather.propTypes = {
  currentWeather: PropTypes.object.isRequired,
  currentCityBackground: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired
};

export default CurrentWeather;
