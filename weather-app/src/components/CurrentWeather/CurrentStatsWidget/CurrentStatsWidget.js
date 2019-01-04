import React, { Component } from "react";
import PropTypes from "prop-types";
import Palette from "react-palette";

import style from "./CurrentStatsWidget.scss";

class CurrentStatsWidget extends Component {
  render() {
    return (
      <Palette image={this.props.currentCityBackground()}>
        {palette => (
          <div
            className={style.Container}
            style={{
              backgroundColor: palette.lightMuted,
              backgroundImage:
                `linear-gradient(to bottom left,` +
                palette.lightMuted +
                `,` +
                palette.darkMuted +
                `)`
            }}
          >
            <div className={style.Stats}>
              <div className={style.StatsCol}>
                <span className={style.Value}>
                  {this.props.currentStats.humidity}%
                </span>
                <span className={style.Stat}>Humidity</span>
              </div>
              <div className={style.StatsCol}>
                <span className={style.Value}>
                  {this.props.currentStats.uv}/10
                </span>
                <span className={style.Stat}>UV Index</span>
              </div>
            </div>
            <div className={style.Stats}>
              <div className={style.StatsCol}>
                <span className={style.Value}>12&deg;</span>
                <span className={style.Stat}>Dew Pt.</span>
              </div>
              <div className={style.StatsCol}>
                <span className={style.Value}>
                  {this.props.currentStats.vis_km} km
                </span>
                <span className={style.Stat}>Visibility</span>
              </div>
            </div>
          </div>
        )}
      </Palette>
    );
  }
}

CurrentStatsWidget.propTypes = {
  currentStats: PropTypes.object.isRequired,
  currentCityBackground: PropTypes.func.isRequired
};

export default CurrentStatsWidget;
