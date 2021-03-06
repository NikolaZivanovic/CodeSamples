import _find from "lodash/find";

const ALL_WEATHER_CONDITIONS = [
  {
    code: 1000,
    day: "Sunny",
    night: "Clear",
    icon: "../src/assets/icons/sun.svg"
  },
  {
    code: 1003,
    day: "Partly cloudy",
    night: "Partly cloudy",
    icon: "../src/assets/icons/cloudy.svg"
  },
  {
    code: 1006,
    day: "Cloudy",
    night: "Cloudy",
    icon: "../src/assets/icons/cloudy.svg"
  },
  {
    code: 1009,
    day: "Overcast",
    night: "Overcast",
    icon: "../src/assets/icons/cloudy.svg"
  },
  {
    code: 1030,
    day: "Mist",
    night: "Mist",
    icon: "../src/assets/icons/cloud.svg"
  },
  {
    code: 1063,
    day: "Patchy rain possible",
    night: "Patchy rain possible",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1066,
    day: "Patchy snow possible",
    night: "Patchy snow possible",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1069,
    day: "Patchy sleet possible",
    night: "Patchy sleet possible",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1072,
    day: "Patchy freezing drizzle possible",
    night: "Patchy freezing drizzle possible",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1087,
    day: "Thundery outbreaks possible",
    night: "Thundery outbreaks possible",
    icon: "../src/assets/icons/storm.svg"
  },
  {
    code: 1114,
    day: "Blowing snow",
    night: "Blowing snow",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1117,
    day: "Blizzard",
    night: "Blizzard",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1135,
    day: "Fog",
    night: "Fog",
    icon: "../src/assets/icons/cloud.svg"
  },
  {
    code: 1147,
    day: "Freezing fog",
    night: "Freezing fog",
    icon: "../src/assets/icons/cloud.svg"
  },
  {
    code: 1150,
    day: "Patchy light drizzle",
    night: "Patchy light drizzle",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1153,
    day: "Light drizzle",
    night: "Light drizzle",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1168,
    day: "Freezing drizzle",
    night: "Freezing drizzle",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1171,
    day: "Heavy freezing drizzle",
    night: "Heavy freezing drizzle",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1180,
    day: "Patchy light rain",
    night: "Patchy light rain",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1183,
    day: "Light rain",
    night: "Light rain",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1186,
    day: "Moderate rain at times",
    night: "Moderate rain at times",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1189,
    day: "Moderate rain",
    night: "Moderate rain",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1192,
    day: "Heavy rain at times",
    night: "Heavy rain at times",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1195,
    day: "Heavy rain",
    night: "Heavy rain",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1198,
    day: "Light freezing rain",
    night: "Light freezing rain",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1201,
    day: "Moderate or heavy freezing rain",
    night: "Moderate or heavy freezing rain",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1204,
    day: "Light sleet",
    night: "Light sleet",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1207,
    day: "Moderate or heavy sleet",
    night: "Moderate or heavy sleet",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1210,
    day: "Patchy light snow",
    night: "Patchy light snow",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1213,
    day: "Light snow",
    night: "Light snow",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1216,
    day: "Patchy moderate snow",
    night: "Patchy moderate snow",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1219,
    day: "Moderate snow",
    night: "Moderate snow",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1222,
    day: "Patchy heavy snow",
    night: "Patchy heavy snow",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1225,
    day: "Heavy snow",
    night: "Heavy snow",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1237,
    day: "Ice pellets",
    night: "Ice pellets",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1240,
    day: "Light rain shower",
    night: "Light rain shower",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1243,
    day: "Moderate or heavy rain shower",
    night: "Moderate or heavy rain shower",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1246,
    day: "Torrential rain shower",
    night: "Torrential rain shower",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1249,
    day: "Light sleet showers",
    night: "Light sleet showers",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1252,
    day: "Moderate or heavy sleet showers",
    night: "Moderate or heavy sleet showers",
    icon: "../src/assets/icons/rain.svg"
  },
  {
    code: 1255,
    day: "Light snow showers",
    night: "Light snow showers",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1258,
    day: "Moderate or heavy snow showers",
    night: "Moderate or heavy snow showers",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1261,
    day: "Light showers of ice pellets",
    night: "Light showers of ice pellets",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1264,
    day: "Moderate or heavy showers of ice pellets",
    night: "Moderate or heavy showers of ice pellets",
    icon: "../src/assets/icons/snowing.svg"
  },
  {
    code: 1273,
    day: "Patchy light rain with thunder",
    night: "Patchy light rain with thunder",
    icon: "../src/assets/icons/storm.svg"
  },
  {
    code: 1276,
    day: "Moderate or heavy rain with thunder",
    night: "Moderate or heavy rain with thunder",
    icon: "../src/assets/icons/storm.svg"
  },
  {
    code: 1279,
    day: "Patchy light snow with thunder",
    night: "Patchy light snow with thunder",
    icon: "../src/assets/icons/storm.svg"
  },
  {
    code: 1282,
    day: "Moderate or heavy snow with thunder",
    night: "Moderate or heavy snow with thunder",
    icon: "../src/assets/icons/storm.svg"
  }
];

export const getWeatherIcon = code => {
  const icon = _find(ALL_WEATHER_CONDITIONS, { code: code });
  return icon.icon;
};
