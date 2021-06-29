
// Otra version del reto usando https en vez de xmlhttpresponse

/*
const https = require("https");
const API_BASE = 'https://rickandmortyapi.com/api/';

const APIRequest = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.setEncoding('utf8');
            if(res.statusCode === 200) {
                let body = '';
                res.on('data', (data) => {
                    body += data;
                });
                res.on('end', () => { 
                    resolve(JSON.parse(body));
                });
            } else reject(new Error(`REQUEST ERROR ON ${url}. Status ${res.statusCode}`));
        });
    });
}

APIRequest(API_BASE + 'character/')
    .then((response) => {
        console.log(response.info.count)
        return APIRequest(API_BASE + 'character/' + response.results[0].id);
    })
    .then((response) => {
        console.log(response.name)
        return APIRequest(response.origin.url);
    })
    .then((response) => {
        console.log(response.dimension)
    })
    .catch((error) => console.error(error));


*/



//Las peticiones Ejemplo del curso - Oscar

// importamos la funcion
const fetchData = require('../utils/fetchData');
// declaramos la ruta de la api
const API = 'https://rickandmortyapi.com/api/character/';

fetchData(API)
  .then(data => {
    // imprimimos el numero de personajes
    console.log(data.info.count);

    // volvemos a hacer la promesa de pedir algo, en este caso el personaje 1: Rick
    return fetchData(`${API}${data.results[0].id}`);
  })
  .then(data => {

    // esperamos la promesa anterior y vemos el nombre de rick
    console.log(data.name);
    // volvemos a hacer la promesa, pero esta es sobre la dimension de Rick
    return fetchData(data.origin.url)
  })
  .then(data => {
    // vemos la dimension de rick
    console.log(data.dimension);
  })
  // si hay error
  .catch(error => {

   
    console.log(error);
  })