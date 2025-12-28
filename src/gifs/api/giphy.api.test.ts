import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";



describe ('giphyApi', () => {


    test('should be configured correctly', () => {

        const params = giphyApi.defaults.params;

        //console.log(giphyApi.defaults);

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');

        //Verificar los parametros por dos metodos que hacen
        // lo mismo
        //metodo #1 datos primitivos
        expect(params.lang).toBe('es');
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);

        //metodo #2 datos complejos
        expect(params).toEqual({
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
            lang: 'es'
        });
    });
});