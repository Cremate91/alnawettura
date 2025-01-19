import { useParams } from 'react-router'
import { CityWeatherCard } from '../custom/app-city-weather-card'
import { useQuery } from '@tanstack/react-query';
import { getWeatherByCity, getWeatherForecastByCity } from '@/api/open-weather';
import { WeatherForecastCard } from '../custom/app-weather-forecast-card';

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

  if (!weatherForecast) return null
  if (weatherForecastError) return (<span>Error...</span>)
  if (weatherForecastIsPending) return (<span>Loading...</span>)

  return (
    <>
      {error && <span>Error...</span>}
      {weather && <CityWeatherCard city={{ id: weather.id, lat: weather.coord.lat, lon: weather.coord.lon, name: weather.name }} weather={weather} />}
      <h2 className='text-xl text-accent font-bold my-4'>Vorschau auf die nächsten Tage:</h2>
      <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        {filteredWeatherForecast?.map(forecast => (
          <WeatherForecastCard key={forecast.dt} date={forecast.dt_txt?.split(' ')[0] || ''} weather={forecast} />
        ))}
      </div>
    </>
  )
}
