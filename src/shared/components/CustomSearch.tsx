import { useEffect, useState } from "react";

interface Props {
  customPlaceHolder?: string;

  onQuery?: ( query: string ) => void;
}

export const CustomSearch = ({ customPlaceHolder = 'Buscar', onQuery }: Props) => {

    const [query, setQuery] = useState('')  

    useEffect(() => {
        const timeoutId = setTimeout(() => {
           onQuery?.(query);
        }, 700);

        return () => clearTimeout(timeoutId);
    },[query, onQuery]); 
    
    
    const handleSearch = () =>{
        onQuery?.( query )
        setQuery('')
    }

    const handleKeydown = ( event: React.KeyboardEvent<HTMLInputElement> ) => {
        if( event.key === 'Enter' ){
            handleSearch()
        }
    }
  
    return (
    <div className="search-container">
      <input 
          type="text" 
          placeholder={customPlaceHolder} 
          value = {query}
          onChange = {(e) => setQuery(e.target.value)}
          onKeyDown={ (event) => handleKeydown(event) }
       />
      <button
         onClick={ handleSearch}
      >Buscar</button>
    </div>
  );
};
