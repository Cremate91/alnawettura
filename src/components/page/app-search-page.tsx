import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useQuery } from '@tanstack/react-query';
import { getGeoByCityName, getWeatherByCity } from '@/api/open-weather';
import { City } from '@/types/types';
import { formSchema } from '@/schema/form';
import { CityWeatherCard } from '../custom/app-city-weather-card';

export function AppSearchPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
    },
  })

  const inputCity = form.getValues().city

  const { error: geoLocationError, data: geoLocations, refetch } = useQuery({
    queryKey: ['city', inputCity],
    queryFn: async () => getGeoByCityName(inputCity),
    enabled: false,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false
  })

  const city = geoLocations ? {
    id: Math.ceil(Math.random() * 1000),
    lat: geoLocations[0].lat,
    lon: geoLocations[0].lon,
    name: geoLocations[0]?.local_names?.['de'] || geoLocations[0].name
  } as City : undefined;

  const { error, data: weatherData } = useQuery({
    queryKey: ['weather', geoLocations],
    queryFn: async () => {
      if (!city) return undefined
      const weather = await getWeatherByCity(city)
      return weather ? weather : undefined
    },
    enabled: !!geoLocations,
    refetchOnWindowFocus: false,
  })

  if (geoLocationError) {
    return <div>some errors</div>
  }

  if (geoLocations?.length === 0) {
    return <div>missing Data</div>
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => refetch())} className="space-y-8">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stadt</FormLabel>
                <FormControl>
                  <Input placeholder="Berlin" {...field} />
                </FormControl>
                <FormDescription>
                  Gib den Namen einer Stadt ein, um das Wetter zu sehen.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>

          {error && <p>Error: {error.message}</p>}
          {weatherData && city && (
            <CityWeatherCard city={city} weather={weatherData} />
          )}
        </form>
      </Form>
    </>
  )
}