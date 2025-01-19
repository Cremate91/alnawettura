export type AWWeather = {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain: {
    '1h': number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type AWCity = {
  id: number
  name: string
  lat: number
  lon: number
}

type LocalNames = {
  [key: string]: string;
}

export type GeoLocation = {
  name: string;
  local_names?: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface OWACoordinates {
  lon: number;
  lat: number;
}

interface OWACity {
  id: number;
  name: string;
  coord: OWACoordinates;
  country: string;
  population: number;
  timezone: number;
}

export interface OWAWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OWAMainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface OWAWeatherEntry {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OWAClouds {
  all: number;
}

export interface OWAWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface OWASys {
  pod: string;
}

export interface OWAForecast {
  dt: number;
  main: OWAMainInfo;
  weather: OWAWeatherEntry[];
  clouds: OWAClouds;
  wind: OWAWind;
  visibility: number;
  pop: number;
  sys: OWASys;
  dt_txt: string;
}

export interface OWAWeatherData {
  city: OWACity;
  cod: string;
  message: number;
  cnt: number;
  list: OWAForecast[];
}

