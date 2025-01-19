import { AWCity } from '../types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

type FavoriteCitiesStore = {
  favoriteCities: AWCity[];
  addFavorite: (favoriteCity: AWCity) => void;
  removeFavorite: (favoriteCity: AWCity) => void;
};

export const useFavoriteCitiesStore = create<FavoriteCitiesStore>()(
  devtools(
    persist(
      (set) => ({
        favoriteCities: [] as AWCity[],
        addFavorite: (favoriteCity: AWCity) => set((state) => ({ favoriteCities: [...state.favoriteCities, favoriteCity] })),
        removeFavorite: (favoriteCity: AWCity) => set((state) => ({ favoriteCities: state.favoriteCities.filter((f) => f !== favoriteCity) })),
      }),
      { name: 'AW-local-weather' },
    ),
    {
      enabled: true,
      name: 'fav-store'
    }
  ));