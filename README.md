# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Temas puntuales
Esta es una sección grande sobre pruebas automáticas, donde cubriremos fuertemente la aplicación de Gifs que hicimos en la sección anterior.
Puntualmente aprenderemos sobre:
   o  Pruebas sobre hooks
   o  Pruebas sobre custom hooks
   o  Pruebas con tareas asíncronas
   o  Pruebas con tareas que involucran timeouts
   o  Pruebas sobre axios
   o  Integrar testing en el proceso de construcción
   o  Espías
   o  obre escribir funciones para el testing
   o  Manejo de excepciones


Proyecto React buscar gifs
1.- comprobar version de node
    node --version
    v       20.19.4
2.- npm create vite
    o  Project name:
    |  03_gifs-app
    o  Select a framework:
    |  React
    o  Select a variant:
    |  TypeScript + SWC

    cd 03_gifs-app
    npm install
    npm run dev
3.- abrir el proyecto en vscode y eliminar :
        o  carpeta assets
        o  App.css
        o  App.tsx
    eliminar contenido de
        o  index.css
    quitar dependencias rotas de 
        o  main.tsx
4.- tareas
    o  agrego este css https://gist.github.com/Klerith/78df674c84d833d28d5c06359b04fc75
       al index.css
    o  instalo la font de https://fonts.google.com/specimen/Montserrat+Alternates
       1.- Get font
       2.- Get embed code 
           seleccionas las letras
             Light 300
             Regular 400
             Bold 700
        3.- copio el codigo generado de 
               Embed code in the <head> of your html
               y lo pego en el index.html
            copio el codigo generado de 
               Montserrat Alternates: CSS classes
               y lo pego en el index.css
5.- para consumir peticiones API instalamos AXIOS
    o  npm install axios

E J E R C I C I O     T E R M I N A D O
El ejercicio termino en el paso anterior SEGUIMOS CON 
LA PARTE II que se grabara como [03_gifs-app_v2]
- inicia la version v.2
6.- Instalamos developer tools
    https://react.dev/learn/react-developer-tools
7.- vamos a crear el archivo de RELEASE que se subira para que se use en la WEB
    c:\npm run build
       corregir los errores
    a.- esta pagina permite montar el aplicativo que creamos de forma local y probarlo como localhost
            https://www.npmjs.com/package/http-server
        para instalarlo de forma local y probarlo como localhost
           1.- abre el cdm como administrador
           2.- y con la nstalacion Globally via npm
               c:\npm install --global http-server
           3.- me voy a la carpeta [dist] donde esta mi proyecto 
               C:\Projects\Git\React\03_gifs-app_v2>cd dist
           4.- me voy a la carpeta [dist] de mi proyecto y ejecuto
               C:\Projects\Git\React\03_gifs-app_v2\dist>http-server -o
    b.- esta pagina permite montar el aplicativo que creamos en la WEB
            https://www.netlify.com/
           1.- creo una cuenta
           2.- agrego la carpeta [dist] a la plataforma
           3.- pongo nombre del proyecto
           4.- Release listo
        

E J E R C I C I O     T E R M I N A D O
El ejercicio termino en el paso anterior SEGUIMOS CON 
LA PARTE III pruebas TEST que se grabara como [03_gifs-app_v3]
- inicia la version v.3
8.- cosas para instalar 
      https://gist.github.com/Klerith/3a3d8df27c19755c829ee5c0cef55a55
    lo subi a mi https://gist.github.com/edyaca-git
    Todo en un sólo comando
    a.- abre en la carpeta
        C:\Projects\Git\React\03_gifs-app_v2>
        npm install --save-dev @testing-library/react @testing-library/dom vitest jsdom
    b.- en package.json agrega los scripts
            "scripts": {
                -----
                -----,
                "test": "vitest",
                "test:ui": "vitest --ui",
                "coverage": "vitest run --coverage"
            }
    b.- en Configurar vite.config.ts
        comento el codifo que estaba y agrego este
            import { defineConfig } from 'vitest/config';
            import react from '@vitejs/plugin-react-swc';

            // https://vite.dev/config/
            export default defineConfig({
            plugins: [react()],
            test: {
                environment: 'jsdom',
                globals: true,
            },
            });     
    c.- creo mi  GifsApp.test.tsx le agrego el codigo y 
        corro mi prueba
        C:\Projects\Git\React\03_gifs-app_v2>npm run test
            ✓ src/GifsApp.test.tsx (1 test) 8ms
            ✓ GifsApp (1)
                ✓ should render component properly 2ms

            Test Files  1 passed (1)
                Tests  1 passed (1)
            Start at  16:38:33
            Duration  51.94s (transform 205ms, setup 0ms, import 312ms, tests 8ms, environment 49.06s)

            PASS  Waiting for file changes...
                press h to show help, press q to quit  
    c.- en https://www.npmjs.com/package/axios-mock-adapter
        instalar
        C:\Projects\Git\React\03_gifs-app_v2>npm install axios-mock-adapter --save-dev
        comprobar que en [package.json] se encuentra
        "devDependencies": {
            -------
            "axios-mock-adapter": "^2.1.0",
    d.- veamos la cobertura de las pruebas
        C:\Projects\Git\React\03_gifs-app_v3>npm run coverage
        si pide instalar lo hacemos y volvemos a ejecutar        
        > 03_gifs-app@0.0.0 coverage
        > vitest run --coverage

        MISSING DEPENDENCY  Cannot find dependency '@vitest/coverage-v8'

        √ Do you want to install @vitest/coverage-v8? ... yes

        crea la carpeta C:\Projects\Git\React\03_gifs-app_v3\coverage 
        ejecutemos el index.html
E J E R C I C I O     T E R M I N A D O
