import { OWAForecast } from "@/types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { WeatherItem } from "./app-weather-item"


export const WeatherForecastCard = ({ date, weather }: { date: string, weather: OWAForecast }) => {
  const formattedDate = new Date(date).toLocaleDateString('de', { dateStyle: 'medium' })

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>
          <h2>{formattedDate}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <WeatherItem weather={weather} />
      </CardContent>
    </Card>
  )
}
