import {
  FETCHING_FORECAST_IN_PROGRESS,
  FETCHING_FORECAST_SUCCESS,
  FETCHING_FORECAST_ERROR
} from "./forecast.actionTypes";

const INIT_STATE = {
  isError: false,
  isLoading: false,
  data: null
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case FETCHING_FORECAST_IN_PROGRESS:
      return {
        ...state,
        isLoading: true
      };

    case FETCHING_FORECAST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    case FETCHING_FORECAST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.forecast
      };

    default:
      return state;
  }
}
