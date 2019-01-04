import React, { Component } from "react";
import PropTypes from "prop-types";
import { AVAILABLE_CITIES } from "../../../util/availableCities";

import style from "./DropDown.scss";

class DropDown extends Component {
  removeSelectedCity = (currentCity, availableCity) => {
    if (currentCity !== availableCity) {
      return (
        <p
          key={availableCity}
          className={style.AvailateCities}
          onClick={() => this.props.setCityForecast(availableCity)}
        >
          {availableCity}
        </p>
      );
    }
  };

  render() {
    return (
      <div className={style.Container}>
        <span className={style.CurrentCity}>{this.props.currentCity}</span>
        <div className={style.DropDownContainer}>
          {AVAILABLE_CITIES.map(city =>
            this.removeSelectedCity(this.props.currentCity, city.city)
          )}
        </div>
      </div>
    );
  }
}

DropDown.propTypes = {
  setCityForecast: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired
};

export default DropDown;
