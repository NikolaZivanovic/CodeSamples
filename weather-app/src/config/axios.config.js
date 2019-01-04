import axios from "axios";
import CONFIG from "./config";

export function initializeAxios() {
  axios.defaults.timeout = CONFIG.AJAX_REQUEST_DEFAULT_TIMEOUT;
  axios.defaults.responseType = "json";
  axios.defaults.baseURL = CONFIG.API_BASE_URL;
}
