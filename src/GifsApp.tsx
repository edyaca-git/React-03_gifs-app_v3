import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { CustomSearch } from "./shared/components/CustomSearch";

import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {

  const { gifs, previousTerms, handleTermCliked, handleSearch } = useGifs();

  return (
    <>
      {/*  Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/*  Search */}
      <CustomSearch
        customPlaceHolder="Buscar gifs..."
        onQuery={(query: string) => handleSearch(query)}
      />

      {/*  previous Searches */}
      <PreviousSearches
        previousSearches={previousTerms}
        onLabelClick={handleTermCliked}
      />

      {/*  gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
