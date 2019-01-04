import {
  FETCHING_FORECAST_IN_PROGRESS,
  FETCHING_FORECAST_SUCCESS,
  FETCHING_FORECAST_ERROR
} from "./forecast.actionTypes";
import axios from "axios";

export const fetchForecast = city => dispatch => {
  dispatch({ type: FETCHING_FORECAST_IN_PROGRESS });

  return axios
    .get(city + "&days=7")
    .then(response => {
      dispatch({
        type: FETCHING_FORECAST_SUCCESS,
        payload: {
          forecast: response.data
        }
      });
    })
    .catch(() => {
      dispatch({ type: FETCHING_FORECAST_ERROR });
    });
};
