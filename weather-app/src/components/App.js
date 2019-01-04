import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchForecast } from "../components/DATA/forecastData/forecast.actions";

import CurrentWeather from "./CurrentWeather/CurrentWeather";
import Forecast from "./Forecast/Forecast";

import Loader from "../util/Loader/Loader";
import NotLoadedWidget from "../util/NotLoadedWidget/NotLoadedWidget";

class App extends Component {
  state = {
    city: "Belgrade"
  };

  componentDidMount() {
    this.props.fetchForecast(this.state.city);
  }

  setCityForecast = city => {
    this.setState({
      city: city
    });
    this.props.fetchForecast(city);
  };

  getBackgroundImage = () => {
    const bg =
      "https://uploads.codesandbox.io/uploads/user/1e54e5e8-919a-492b-b649-7773dcf409ea/Q7QA-bg.jpg";
    const ns =
      "https://uploads.codesandbox.io/uploads/user/1e54e5e8-919a-492b-b649-7773dcf409ea/TIRH-ns.jpg";
    if (this.state.city === "Belgrade") {
      return bg;
    }
    return ns;
  };

  render() {
    return (
      <div className="wrapper">
        {this.props.forecastReducer.data &&
          !this.props.forecastReducer.isLoading && (
            <Fragment>
              <CurrentWeather
                currentWeather={this.props.forecastReducer.data.current}
                currentCity={this.state.city}
                currentCityBackground={() => this.getBackgroundImage()}
              />
              <Forecast
                setCityForecast={this.setCityForecast}
                currentCity={this.state.city}
                forecastData={
                  this.props.forecastReducer.data.forecast.forecastday
                }
              />
            </Fragment>
          )}

        {this.props.forecastReducer.isLoading && <Loader />}

        {this.props.forecastReducer.isError && <NotLoadedWidget />}
      </div>
    );
  }
}

App.propTypes = {
  fetchForecast: PropTypes.func.isRequired,
  forecastReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forecastReducer: state.forecastReducer
});

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
)(App);
