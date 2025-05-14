import { OpenMeteoDailyForecast } from "../types/types";

export const mockWeatherData: OpenMeteoDailyForecast = {
  latitude: 33.44,
  longitude: -94.04,
  generationtime_ms: 0.5,
  utc_offset_seconds: 0,
  timezone: "America/Chicago",
  timezone_abbreviation: "CDT",
  elevation: 100,
  daily: {
    time: [
      "2024-06-01",
      "2024-06-02",
      "2024-06-03",
      "2024-06-04",
      "2024-06-05",
      "2024-06-06",
      "2024-06-07"
    ],
    temperature_2m_max: [295.15, 296.15, 297.15, 298.15, 299.15, 300.15, 301.15],
    temperature_2m_min: [285.15, 286.15, 287.15, 288.15, 289.15, 290.15, 291.15],
    precipitation_sum: [2.1, 0.0, 1.2, 0.0, 0.5, 0.0, 0.0],
    weathercode: [1, 2, 3, 61, 0, 80, 95],
    wind_speed_10m_max: [5.2, 4.8, 6.1, 5.5, 4.9, 5.0, 5.3],
    wind_gusts_10m_max: [8.1, 7.5, 9.0, 8.2, 7.8, 8.0, 8.3],
    uv_index_max: [7, 8, 6, 7, 8, 7, 6],
    cloudcover_mean: [40, 50, 60, 30, 20, 10, 15]
  },
  daily_units: {
    temperature_2m_max: "K",
    temperature_2m_min: "K",
    precipitation_sum: "mm",
    wind_speed_10m_max: "m/s",
    wind_gusts_10m_max: "m/s",
    uv_index_max: "",
    cloudcover_mean: "%",
    time: "iso8601",
    weathercode: "wmo code"
  },
};
  