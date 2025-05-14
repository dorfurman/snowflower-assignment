export interface CitiesData {
  cities: City[];
}

export interface City {
  name: string;
  country: string;
  continent: string;
  active: boolean;
  description: string;
  image: string;
    coords: {
      lat: number;
      lng: number;
    };
}

export interface OpenMeteoDailyForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weathercode: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    uv_index_max: number[];
    cloudcover_mean: number[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
    uv_index_max: string;
    cloudcover_mean: string;
    time: string;
    weathercode: string;
  };
}
