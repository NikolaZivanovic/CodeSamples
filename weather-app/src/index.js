import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import Root from "./components/Root";
import { initializeAxios } from "./config/axios.config";

import "./styles/styles.scss";

const store = configureStore();
initializeAxios();

render(<Root store={store} />, document.getElementById("csb-loading-screen"));
