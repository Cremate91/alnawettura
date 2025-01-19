import { Weather } from '@/types/types'

export const WeatherItem = ({ weather }: { weather: Weather }) => {

  return (
    <div className="flex flex-col gap-4 mr-8">
      <div className="flex gap-4">
        <span className="text-xl">{weather.weather[0].description}</span>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`bild von ${weather.weather[0].description}`} className="h-8 w-8"
        />
      </div>
      <div>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Temperatur:</h2>
        <span className="text-xl">{weather.main.temp}°C</span>
      </div>
      <div>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Windgeschwindigkeit:</h2>
        <span className="text-xl">{weather.wind.speed} km/h</span>
      </div>
      <div>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Luftfeuchtigkeit:</h2>
        <span className="text-xl">{weather.main.humidity}%</span>
      </div>
    </div>
  )
}
