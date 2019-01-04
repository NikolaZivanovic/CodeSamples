import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import { getWeatherIcon } from "../../../util/condition.util";
import Palette from "react-palette";
import Chart from "../../chart";
import { fetchForecast } from "../../DATA/forecastData/forecast.actions";

import style from "./CurrentTempWidget.scss";

class CurrentTempWidget extends Component {
  state = {
    rotation: 0,
    date: Date.now()
  };

  reloadHandler = city => {
    let newRotation = this.state.rotation + 360;

    this.props.fetchForecast(city);
    this.setState({
      rotation: newRotation,
      date: Date.now()
    });
  };

  render() {
    let rotateClass = style.ReloadIcon;
    const rotation = this.state.rotation;
    const rot = {
      transform: `rotate(${rotation}deg)`
    };
    return (
      <Palette image={this.props.currentCityBackground()}>
        {palette => (
          <div
            className={style.Container}
            style={{
              backgroundColor: palette.lightVibrant,
              backgroundImage:
                `linear-gradient(to bottom left,` +
                palette.lightVibrant +
                `,` +
                palette.darkVibrant +
                `)`
            }}
          >
            <div className={style.Temp}>
              <div className={style.WeatherInfo}>
                <div className={style.WeatherInfoTemp}>
                  {this.props.currentTemp.temp_c}&deg;
                </div>
                <div className={style.WeatherInfoDesc}>
                  {this.props.currentTemp.condition.text}
                </div>
              </div>
              <div className={style.WeatherIcon}>
                <img
                  src={getWeatherIcon(this.props.currentTemp.condition.code)}
                  alt="weather icon"
                />
              </div>
            </div>
            <div className={style.SVGContainer}>
              <Chart />
            </div>
            <div
              className={style.Reload}
              onClick={() => this.reloadHandler(this.props.currentCity)}
            >
              <img
                style={rot}
                className={rotateClass}
                src="../src/assets/icons/refresh.svg"
                alt="refresh icon"
              />
              Updated &nbsp;
              <strong>
                <TimeAgo date={this.state.date} />
              </strong>
            </div>
          </div>
        )}
      </Palette>
    );
  }
}

CurrentTempWidget.propTypes = {
  currentTemp: PropTypes.object.isRequired,
  currentCityBackground: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchForecast
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentTempWidget);
