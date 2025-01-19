import { City } from '../types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

type FavoriteCitiesStore = {
  favoriteCities: City[];
  addFavorite: (favoriteCity: City) => void;
  removeFavorite: (favoriteCity: City) => void;
};

export const useFavoriteCitiesStore = create<FavoriteCitiesStore>()(
  devtools(
    persist(
      (set) => ({
        favoriteCities: [] as City[],
        addFavorite: (favoriteCity: City) => set((state) => ({ favoriteCities: [...state.favoriteCities, favoriteCity] })),
        removeFavorite: (favoriteCity: City) => set((state) => ({ favoriteCities: state.favoriteCities.filter((f) => f !== favoriteCity) })),
      }),
      { name: 'AW-local-weather' },
    ),
    {
      enabled: true,
      name: 'fav-store'
    }
  ));