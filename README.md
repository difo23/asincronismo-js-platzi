---
title: "Clases del Curso de Asincronismo con JavaScript"
day: "1"
publishDate: "2021-06-28"
thumbnailImage: "../images/day-1.png"
shareText: " Description: El estudiante aplicará Callbacks, Promesas y Async/Await para extraer información de una API"
hashtags: ['learn', 'JS', 'asincronismo']
draft: false

---

## Asincronismo en JS

| Source:      | https://platzi.com/clases/asincronismo-js/      |
| ------------ | ----------------------------------------------- |
| **Course:**  | Clases del Curso de Asincronismo con JavaScript |
| **Teacher:** | Oscar Barajas Tavares                           |

## Notes 

### 

1. Creamos una carpeta para nuestro prouectop ``asicronismo-js``

   ```bash
   mkdir asincronismo-js
   mkdir asincronismo-js/src
   mkdir asincronismo-js/src/callback
   cd asincronismo-js
   
   ```

2. Inicializamos control de versiones con git ``git init``:

3. Inicializamos npm con `npm init`, elegimos las opciones que nos presente segun nuestro gusto.

4. Creamos nuestro repo en github, `gh repo create`, elegimos las opciones de nuestro interes.

   > Nota: Si no tienes la aplicacion CLI para GitHub debes instalarla. 

## Callbacks

1. Creamos el archivo `touch src/callback/index.js`

2. Codigo en `index.js`

   ```js
   // Ejemplos con callback
   
   function sum(num1, num2){
     return num1 + num2;
   }
   
   // Un callback es una funcion que se envia como parametro a otra.
   function calc(num1, num2, callback){
    return callback(num1, num2);
   }
   
   console.log(calc(3, 4, sum));
   
   ```

3. Para ejecutar nuestro codigo vamos a crear un script para hacerlo directamente con `npm run`

   ```json
   "callback": "node src/callback/index.js"
   ```

   Agregamos la linea anterior en los `scripts` de nuestro `package,json`

   ```json
   {
     "name": "curso_de_asincronismo_con_javascript",
     "version": "1.0.0",
     "description": "Curso de sobre asincronismo usando js - curso desarrollado en platzi",
     "main": "index.js",
     "scripts": {
       "callback": "node src/callback/index.js"
     },
     "keywords": [
       "js",
       "asincronismo",
       "callback",
       "promesas"
     ],
     "author": "Lizandro Jose Ramirez",
     "license": "ISC"
   }
   ```

## Timeout con callbacks

```js
// Callback with timeout continue in 'callback/index.js'

function date(callback) {
    console.log(new Date);
    setTimeout(function (){
        let date = new Date;
        callback(date)
    }, 3000)
}

function printDate(dateNow){
    console.log(dateNow);
}

date(printDate)


```

## Peticiones a APIs usando Callbacks: (Usamos postman)

```ba
API: https://rickandmortyapi.com/api/
```

```bash
Personajes
Primera peticion: https://rickandmortyapi.com/api/character/

```


```json
{
  "info": {
    "count": 671,
    "pages": 34,
    "next": "https://rickandmortyapi.com/api/character/?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
        "name": "Earth (Replacement Dimension)",
        "url": "https://rickandmortyapi.com/api/location/20"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        .
        .
        .
      ],
      "url": "https://rickandmortyapi.com/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
    },
        .
        .
        .
      
  ]
      
}
```

```bash
Dimension del pesonaje
Segunda peticion : https://rickandmortyapi.com/api/location/1
```

```json
{
  "id": 20,
  "name": "Earth (Replacement Dimension)",
  "type": "Planet",
  "dimension": "Replacement Dimension",
  "residents": [
    "https://rickandmortyapi.com/api/character/1",
      .
      .
      .
   ],
  "url": "https://rickandmortyapi.com/api/location/20",
  "created": "2017-11-18T19:33:01.173Z"
}  
```

## Solucion 1: usando API fetch

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Fetch Dimension Rick and Morty</title>
</head>

<body>
    <h1> Results: </h1>
    <ul id='root'>
        <!-- Results -->
    </ul>
    <script src="./fetchApi.js"></script>
</body>

</html>
```

```js
// API: https://rickandmortyapi.com/api/
// Uso el html para no installar el modulo fetch en mi node_modules

let url_api = "https://rickandmortyapi.com/api/";

// Personajes
// Primera peticion: https://rickandmortyapi.com/api/character/

let url_api_character = url_api + 'character/';


// Dado el nombre de un personaje debemos devolver la dimension de ese personaje
let name_character = 'Rick'

// https://rickandmortyapi.com/api/character/?name=rick&status=alive

let query = `${url_api_character}?name=${name_character}`;

// Dimension del pesonaje
// Segunda peticion : https://rickandmortyapi.com/api/location/1

// Uso promesas que no deberia estar permitido segun el objetivo del problema
const api_fetch = (url_query, callback, name = '') => {

    fetch(url_query)
        .then(response => response.json())
        .then(data => callback(data, name))

}


const get_origin_dimension_query = (result, name) => {

    let element = document.createElement('div');
    document.getElementById(`${name}`).appendChild(element).innerHTML = `
        <strong
            id = ${result.url}            
        >
               Origin Dimension: 

        </strong>
        ${result.dimension} </br>           
    `
}


const get_location_dimension_query = (result, name) => {

    let element = document.createElement('div');
    document.getElementById(`${name}`).appendChild(element).innerHTML = `
        <strong
            id = ${result.url}            
        >
               Location Dimension: 

        </strong>
        ${result.dimension} </br>           
    `
}


const get_character_query = (result, name) => {

    result['results'].forEach(elem => {

        let url_origin_dimension_api = elem['origin'].url;
        let url_location_dimension_api = elem['location'].url;

        let element = document.createElement('div');

        document.getElementById('root').appendChild(element).innerHTML = `
            <li
                id = "${elem.name}-${elem.id}"            
            >
                <strong> Nombre: </strong> ${elem.name} </br>
                <strong> Origen: </strong> ${elem['origin'].name} </br>
                <strong> Location: </strong> ${elem['location'].name} </br>
                <img src = ${elem.image} />
            </li>
        `
        api_fetch(url_origin_dimension_api, get_origin_dimension_query, `${elem.name}-${elem.id}`)
        api_fetch(url_location_dimension_api, get_location_dimension_query, `${elem.name}-${elem.id}`)
    })
}


api_fetch(query, get_character_query)
```



Errores de mi solucion:

* No tomo en consideracion los errores en los callbacks.
* Uso fetch que en este caso esta basado en promesas.

Una idea aceptable:

* Mi solucion no toma en cuenta la secuencia de las peteciones luego de la primera, simplemente actualizan el document cuando se completan.  El name + id identifican el componente donde  las fererentes peticiones agregaran informacion al dom. 



## Solucion del profesor - Oscar

[XMLHttpRequest](https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest)

```bash
npm install xmlhttprequest 
```

```js
// XMLHttpResquest fue creado por microsoft, actualmente no se usa mucho 
// El ejemplo de esta clase es ilustrativo para reforzar en concepto de callback. 

let XMLHttpResquest = require('xmlhttpresquest').XMLHttpResquest;

const fetchData = (url_api, callback) => {

    let xhttp = new XMLHttpRequest();

    // Method http, url api, asincronismo true
    xhttp.open('GET', url_api, true);


    // Escuchando  la conexion cambia
    xhttp.onreadystatechange = (event) => {

        // Necesito conocer el estado de la conexion, desde 0 a 5.
        // El esdado de completado es readyState == 4

        if (xhttp.readyState === 4) {

            // Comprobamos el estatus ok
            if (xhttp.status === 200) {
                callback(null, JSON.stringify(xhttp.responseText))

            } else {
                const error = new Error('Error:' + url_api)
                return callback(error, null)
            }
        }

    }
    
    // por ultimo enviamos la peticion
  xhttp.send();
}
```

10 Plugins esenciales de VSCode para Frontends

> https://platzi.com/blog/10-plugins-esenciales-para-vscodeCode 

Spell Checker - Visual Studio Marketplace

> https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

# El callback hell

Ideal con el callback es solo tener 3 peticiones, mas de ahi es un infierno, muy mala practica.

```js
// importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// direccion de la API
let api = 'https://rickandmortyapi.com/api/character/';

// funcion principal
function fetchData(url_api, callback){
  // instanciamos la conexion
  let xhttp = new XMLHttpRequest();
  // abrir una conexion con el metodo, la ruta y si es asincrono
  xhttp.open('GET', url_api, true);
  // validacion del llamado
  xhttp.onreadystatechange = (event) => {
    // el state 4 es el ultimo de la peticion
    if(xhttp.readyState === 4){
      // verificamos que el status este en 200, que dice que todo bien, no un 400 o 500
      if(xhttp.status === 200){
        // el primer valor es el err, y el siguiente el resultado
        // ejecutamos el callback con el resultado
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        // si no es 200
        let error = new Error('Error: ' + url_api);
        // matamos el proceso con un error
        return callback(error, null);
      }
    }
  }
  // por ultimo enviamos la peticion
  xhttp.send();
}

// primero buscamos la lista de personajes
fetchData(api, (error1, data1) => {
  // si error, matamos retornando un error
  if(error1) return console.error(error1);
  // luego buscamos en la api el id de Rick
  fetchData(api + data1.results[0].id, (error2, data2) => {
    // si error, matamos retornando un error
    if(error2) return console.error(error2);
    // por ultimo la consulta a la api que contiene su dimension
    fetchData(data2.origin.url, (error3, data3) => {
      // si error, matamos retornando un error
      if(error3) return console.error(error3);
      
      // mostramos los resultados :) 
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension);
      
      // rutas de las peticiones en orden
      console.log(api);
      console.log(api + data1.results[0].id); 
      console.log(data2.origin.url); 
    
    });
  });
});
```



## Promesas y Async-Await quedan desarrolladas en el codigo

## Refleciones finales



**Callbacks** --> Ventajas: Simple(una función que recibe otra función). Son universales, corren en cualquier navegador.
Desventajas: Composición tediosa, anidando cada vez más elementos. Caer en Callback Hell.

**Promesas** --> Ventajas: Facilmente enlazables .Then( return… ).Then - Fácil e intuitivo de leer.
Desventajas: Posible error si no se retorna el siguiente llamado. No corre en todos los navegadores.

**Async-Await** --> Ventajas: Se puede usar try-catch . Código más ordenado e intuitivo.
Desventajas: No corre en todos los navegadores (se requiere un transpilador).