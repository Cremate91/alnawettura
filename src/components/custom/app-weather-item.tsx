import { AWWeather, OWAForecast } from '@/types/types'

export const WeatherItem = ({ weather }: { weather: AWWeather | OWAForecast }) => {
  const { description, icon } = weather.weather[0];
  const { temp, humidity } = weather.main;
  const speed = weather.wind.speed;

  return (
    <div className="flex flex-col gap-4 mr-8">
      <div className="flex gap-4">
        <span className="text-xl">{description}</span>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={`bild von ${description}`} className="h-8 w-8"
        />
      </div>
      <div>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Temperatur:</h2>
        <span className="text-xl">{temp}°C</span>
      </div>
      <div>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Windgeschwindigkeit:</h2>
        <span className="text-xl">{speed} km/h</span>
      </div>
      <div>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Luftfeuchtigkeit:</h2>
        <span className="text-xl">{humidity}%</span>
      </div>
    </div>
  )
}
