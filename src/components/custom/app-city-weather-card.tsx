import { City, Weather } from "@/types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { FavoriteButton } from "./app-favorite-button"
import { WeatherItem } from "./app-weather-item"
import { NavLink } from "react-router"

export const CityWeatherCard = ({ city, weather }: { city: City, weather: Weather }) => {
  return (
    <NavLink to={`/weather-detail/${city.id}`} className="inline-block  w-full md:max-w-[300px]">
      <Card className="relative">
        <CardHeader>
          <CardTitle>
            <h2>{city.name}</h2>
          </CardTitle>
          <div className="absolute top-4 right-4">
            <FavoriteButton city={city} />
          </div>
        </CardHeader>
        <CardContent>
          <WeatherItem weather={weather} />
        </CardContent>
      </Card>
    </NavLink>
  )
}
