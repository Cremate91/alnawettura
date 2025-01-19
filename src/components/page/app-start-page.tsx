import { defaultCities } from "@/lib/dummyDB"
import { useQueries } from "@tanstack/react-query"
import { Skeleton } from "../ui/skeleton"
import { getWeatherByCity } from "@/api/open-weather"
import { CityWeatherCard } from "@/components/custom/app-city-weather-card"

export const StartPage = () => {
  const defaultWeatherQueries = useQueries({
    queries: defaultCities.map(city => {
      return {
        queryKey: ['city', city.id],
        queryFn: async () => getWeatherByCity(city),
      }
    })
  })

  return (
    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {defaultWeatherQueries.map((weatherQuery, index) => {
        const { data, isLoading, isPending, error } = weatherQuery;

        if (error) {
          return <div>Es ist ein Fehler aufgetreten versuch es später nochmal</div>
        }

        if (isLoading || isPending) {
          return <Skeleton key={index} className="h-[250px] w-[300px]" />
        }

        return (
          <li key={data.name}>
            <CityWeatherCard city={defaultCities[index]} weather={data} />
          </li>
        )
      })}
    </ul>
  )


}