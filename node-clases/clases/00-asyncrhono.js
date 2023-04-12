// import fetch from 'node-fetch'
require('dotenv').config()
var fetch = require('node-fetch')

let nombre = process.env.NAME
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/'

// function promise (nombre=null){
//     return new Promise((resolver, rejected) => {
//         setTimeout(() => {
//             if(nombre == null){
//                 rejected('Nombre no puede estar vacío')
//             } 
//             resolver(nombre)
//         }, 1000)
//     })
// }

// promise(nombre)
// .then((nombre) => {
//     console.log(`Hola ${nombre}`)
// })
// .catch((err) => {
//     console.log(err)
// })

// async function getPokemon(specieNumber){
//     if(specieNumber <= 0 || specieNumber > 901) {
//         console.error('Select a number between 1 and 901')
//     }
//     const response = await fetch(POKEAPI_URL + specieNumber)
//     console.log(response)
//     if(!response.ok){
//         return console.error('Pokemon no found')
//     } 
//     const pokemon = await response.json()
//     console.log(pokemon)
// }

// getPokemon(100)
