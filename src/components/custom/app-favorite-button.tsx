import { useFavoriteCitiesStore } from "@/state/favorite-city-store"
import { AWCity } from "@/types/types";
import { Heart } from "lucide-react";
import { useState } from "react";

export const FavoriteButton = ({ city }: { city: AWCity }) => {
  const { favoriteCities, removeFavorite, addFavorite } = useFavoriteCitiesStore();
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      {favoriteCities.find((favCity: AWCity) => favCity.name === city.name) ?
        <Heart className="cursor-pointer"
          fill={isHover ? '#f87171' : '#8a0035'}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={(event) => { event.preventDefault(); removeFavorite(city) }}
        /> :
        <Heart
          className="cursor-pointer"
          fill={isHover ? '#f87171' : 'transparent'}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={(event) => { event.preventDefault(); addFavorite(city) }}
        />}
    </>

  )
}

