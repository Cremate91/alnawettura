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
import { getWeatherByCity } from '@/api/open-weather';
import { formSchema } from '@/schema/form';
import { CityWeatherCard } from '../custom/app-city-weather-card';

export function AppSearchPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
    },
  })

  const inputCity = form.watch('city')

  const { error, data: weather, refetch } = useQuery({
    queryKey: ['weather', inputCity],
    queryFn: async () => await getWeatherByCity(inputCity),
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => refetch())} className="max-w-[500px]">
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
          <Button className='my-4' type="submit">Suchen</Button>

          {error && <p>Error: {error.message}</p>}
        </form>
      </Form>
      {!error && weather && (
        <CityWeatherCard city={{ id: weather.id, lat: weather.coord.lat, lon: weather.coord.lon, name: weather.name }} weather={weather} />
      )}
    </>
  )
}