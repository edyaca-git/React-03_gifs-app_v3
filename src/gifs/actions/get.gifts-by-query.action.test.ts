import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { getGiftsByQuery } from "./get.gifts-by-query.action";
import { giphyApi } from "../api/giphy.api";

import { giphySearchResponseMock } from "../../../test/mock/giphy.response.data";





describe('gefGiftsByQuery', () => {

    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyApi);
    });



    // funciona, se comenta por que se  va a mockear 
    // la llamada a la API en la pureba siguiente con
    // Axios Mock Adapter
    // test('should return a list a gifs', async () => {
    //     const gifs = await getGiftsByQuery('goku');
    //     const [gif1] = gifs;

    //     expect(gifs.length).toBe(10);

    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //         width: expect.any(Number),
    //         height: expect.any(Number),
    //     });
    // });

    test('should return a list of gifs', async () => {

        mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGiftsByQuery('goku');

        expect(gifs.length).toBe(10);

        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        });
    });

    test('should return an empty list of gifs if query is empty', async () => {

        // restaurar el comportamiento original de axios
        // ya que de no usarlo usa el mock creado arriba con sus datos 
        mock.restore(); 

        const gifs = await getGiftsByQuery('');

        expect(gifs.length).toBe(0);



    });


    test('should handle error when the API returns an error', async () => {
         
        // mock para evitar que se muestre el error en 
        // la consola durante la prueba
        const consoleErrorSpy = vi.spyOn(console, 'error')
              .mockImplementation(() => {}); 


        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request'
            }
        });

        const gifs = await getGiftsByQuery('goku');        

        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String) , expect.anything());

        

    });




});


