import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { getWeatherIcon } from "../../../util/condition.util";

import style from "./ForecastCard.scss";

class ForecastCard extends Component {
  render() {
    const date = moment(this.props.forecastData.date).format("ddd");
    return (
      <div className={style.Container}>
        <div className={style.AnimationContainer}>
          <div className={style.ImageContainer}>
            <img
              src={getWeatherIcon(this.props.forecastData.day.condition.code)}
              alt="weather icon"
            />
          </div>
          <div className={style.TempContainer}>
            {Math.round(this.props.forecastData.day.avgtemp_c)}&deg;
          </div>
        </div>
        <div className={style.DateContainer}>{date}</div>
      </div>
    );
  }
}

ForecastCard.propTypes = {};

export default ForecastCard;
