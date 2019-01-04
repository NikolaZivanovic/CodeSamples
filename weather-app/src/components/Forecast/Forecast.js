import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DropDown from "./DropDown/DropDown";
import ForecastCard from "./ForecastCard/ForecastCard";

import style from "./Forecast.scss";

const date = moment().format("DD MMMM");

class Forecast extends Component {
  setBackgroundImage = city => {
    if (city === "Belgrade") {
      return {
        backgroundImage:
          "url(https://uploads.codesandbox.io/uploads/user/1e54e5e8-919a-492b-b649-7773dcf409ea/Q7QA-bg.jpg)"
      };
    }
    return {
      backgroundImage:
        "url(https://uploads.codesandbox.io/uploads/user/1e54e5e8-919a-492b-b649-7773dcf409ea/TIRH-ns.jpg)"
    };
  };

  renderForecastCards = data => {
    return data.map(forecast => {
      return <ForecastCard key={forecast.date} forecastData={forecast} />;
    });
  };

  render() {
    return (
      <div
        className={style.Container}
        style={this.setBackgroundImage(this.props.currentCity)}
      >
        <div>
          <div className={style.DropDownContainer}>
            <DropDown
              setCityForecast={this.props.setCityForecast}
              currentCity={this.props.currentCity}
            />
          </div>
          <div className={style.DateContainer}>
            <span className={style.Date}>{date}</span>
          </div>
        </div>
        <div className={style.ForecastCardContainer}>
          {this.renderForecastCards(this.props.forecastData)}
        </div>
      </div>
    );
  }
}

Forecast.propTypes = {
  setCityForecast: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
  forecastData: PropTypes.array.isRequired
};

export default Forecast;
