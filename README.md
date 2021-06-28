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

