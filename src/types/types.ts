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

export interface CitiesData {
  cities: City[];
}

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely: MinutelyWeather[];
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  alerts?: Alert[];
}

interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
  rain?: Rain;
}

interface MinutelyWeather {
  dt: number;
  precipitation: number;
}

interface HourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
  pop: number;
}

interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temperature;
  feels_like: Temperature;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Rain {
  '1h': number;
}

interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}
