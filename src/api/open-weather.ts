import { apiBaseUrl } from "@/lib/config"
import { GeoLocation, OWAWeatherData, AWWeather } from "@/types/types"

const apiWeatherUrl = `${apiBaseUrl}/data/2.5/weather`
const apiGeoUrl = `${apiBaseUrl}/geo/1.0/direct`
const apiForecastUrl = `${apiBaseUrl}/data/2.5/forecast`

export async function getWeatherByCity(cityName: string): Promise<AWWeather> {
  const response = await fetch(
    `${apiWeatherUrl}?q=${cityName},de&units=metric&lang=de&appid=${import.meta.env.VITE_OWM_API_KEY}`
  )
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message)
  }
  return await response.json()
}

export async function getGeoByCityName(cityName: string): Promise<GeoLocation[]> {
  const response = await fetch(
    `${apiGeoUrl}?q=${cityName},de&limit=${1}&appid=${import.meta.env.VITE_OWM_API_KEY}`
  )
  return await response.json()
}

export async function getWeatherForecastByCity(cityName: string): Promise<OWAWeatherData> {
  const response = await fetch(
    `${apiForecastUrl}?q=${cityName},de&units=metric&lang=de&appid=${import.meta.env.VITE_OWM_API_KEY}`
  )
  return await response.json()
}