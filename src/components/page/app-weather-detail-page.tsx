import { useParams } from 'react-router'
import { CityWeatherCard } from '../custom/app-city-weather-card'
import { useQuery } from '@tanstack/react-query';
import { getWeatherByCity, getWeatherForecastByCity } from '@/api/open-weather';
import { CartesianGrid, XAxis, BarChart, Bar, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const WeatherDetailPage = () => {
  const { name } = useParams()

  const { data: weatherForecast, isPending: weatherForecastIsPending, error: weatherForecastError } = useQuery({
    queryKey: ['weather-forecast', name],
    queryFn: async () => getWeatherForecastByCity(name!),
    enabled: !!name,
    refetchOnWindowFocus: false,
  })

  const { data: weather, error } = useQuery({
    queryKey: ['weather', name],
    queryFn: async () => await getWeatherByCity(name!),
    enabled: !!name,
    refetchOnWindowFocus: false,
  })

  // show only the forecast for next days at 12 o'clock (to reduce the list)
  const filteredWeatherForecast = weatherForecast?.list.filter(forecast => forecast?.dt_txt?.endsWith("12:00:00"));

  const chartData = filteredWeatherForecast?.map(forecast => {
    return {
      day: forecast.dt_txt.split(' ')[0],
      temp: Math.ceil(forecast.main.temp),
    }
  })

  const chartConfig = {
    temp: {
      label: "Temperatur",
    },
  } satisfies ChartConfig

  if (!weatherForecast) return null
  if (weatherForecastError) return (<span>Error...</span>)
  if (weatherForecastIsPending) return (<span>Loading...</span>)

  return (
    <>
      {error && <span>Error...</span>}
      {weather && <CityWeatherCard weather={weather} isLink={false} />}
      <h2 className='text-xl text-accent font-bold my-4'>Vorschau auf die nächsten Tage:</h2>
      <ChartContainer config={chartConfig} className="w-1/3 -ml-10">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={true} />
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="temp" fill="#b5ce34" barSize={30} />
        </BarChart>
      </ChartContainer>
    </>
  )
}
