import { apiBaseUrl } from "@/lib/config"
import { City, GeoLocation, Weather } from "@/types/types"

const apiWeatherUrl = `${apiBaseUrl}/data/2.5/weather`
const apiGeoUrl = `${apiBaseUrl}/geo/1.0/direct`

export async function getWeatherByCity(city: City): Promise<Weather> {
  const response = await fetch(
    `${apiWeatherUrl}?lat=${city.lat}&lon=${city.lon}&units=metric&lang=de&appid=${import.meta.env.VITE_OWM_API_KEY}`
  )
  return await response.json()
}

export async function getGeoByCityName(cityName: string): Promise<GeoLocation[]> {
  const response = await fetch(
    `${apiGeoUrl}?q=${cityName},${'DE'}&limit=${1}&appid=${import.meta.env.VITE_OWM_API_KEY}`
  )
  return await response.json()
}