// API: https://rickandmortyapi.com/api/

let url_api = "https://rickandmortyapi.com/api/";

// Personajes
// Primera peticion: https://rickandmortyapi.com/api/character/

let url_api_character = url_api + 'character/';


// Dado el nombre de un personaje debemos devolver la dimension de ese personaje
let name_character = 'morty'

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