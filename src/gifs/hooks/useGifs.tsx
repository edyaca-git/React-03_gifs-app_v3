import { useRef, useState } from "react";
import { getGiftsByQuery } from "../actions/get.gifts-by-query.action";
import type { Gif } from "../interfaces/gif.inteface";

// esta declaracion y asignacion tine que estar fuera del export usoGifs y
// es para que el cache persista entre renderizados
// del hook useGifs
// lo comente por que usare useRef dentro del export useGifs
//const gifsCache: Record<string, Gif[]> = {}; 

export const useGifs = () => {

  const [gifs, setGifs] = useState<Gif[]>([]);

  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermCliked = async (term: string) => {

    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGiftsByQuery(term);
    setGifs(gifs);
    gifsCache.current[term] = gifs;
  };

  const clanQuery = (query: string) => {
    return previousTerms.includes(query.toLowerCase().trim())
      ? ""
      : query.toLowerCase().trim();
  };

  const handleSearch = async (query: string) => {
    if (clanQuery(query).trim().length === 0) return;

    console.log(clanQuery(query));

    setPreviousTerms([clanQuery(query), ...previousTerms].splice(0, 8));

    const gifs = await getGiftsByQuery(query);

    console.log({ gifs });

    setGifs(gifs);

    gifsCache.current[query] = gifs;
  };

  return (
    // values o propiedades
    {
      gifs,
      previousTerms,
      // methods / actions
      handleTermCliked,
      handleSearch,
    }
  )
}
