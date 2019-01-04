import { combineReducers } from "redux";
import forecastReducer from "../components/DATA/forecastData/forecast.reducer";

const rootReducer = combineReducers({
  forecastReducer
});

export default rootReducer;
