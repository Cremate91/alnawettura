# Alnatura meets Weather

## Used Libs
- [Vite](https://vite.dev/) (build-tool)
- [Tailwind](https://tailwindcss.com/) (CSS framework)
- [Shadcn](https://ui.shadcn.com/) (Component-Library)
- [Zod](https://zod.dev/) (validation)
- [Tanstack/Query](https://tanstack.com/query/latest/docs/framework/react/overview) (fetch/query-helper)
- [ReactRouter](https://reactrouter.com/home) (routing)
- [OpenWeatherMap](https://openweathermap.org/) - Weather Api

## Spin up the wheel
1. create an account at OpenWeatherMap to get an accesskey
2. create a `.env` file (their is a `.env-tmp` file which can be copied)
3. run npm to install all packages and start the app 
```
    npm i
    npm run dev
```
## Additional Hints
In the folder `src/lib` you can find a `dummyDB.ts` which holds the default Cites which are displayed on the index-page. You can add or remove entries e.g. use the search-page to search for a City, in the Network-Panel you can find then information about lat/lon (Latitude, Longitude)
```
  Example-Entry
  {
    id: {REPLACE-WITH-RND-NUMBER},
    name: '{REPLACE-WITH-CITY-NAME}',
    lat: {REPLACE-WITH-LATITUDE},
    lon: {REPLACE-WITH-LONGITUDE},
  },
```

The folder `src/components/ui` gets Shadcn-Components placed, don't move them, if you want to adjust them, just create a new Component in the `src/components/custom`.

I used the [kebab-case](https://developer.mozilla.org/de/docs/Glossary/Kebab_case) with `app` as prefix for naming-convention of components