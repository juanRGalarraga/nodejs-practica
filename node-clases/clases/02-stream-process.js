'use strict'

/**
 * Métodos para lectura y escritura en consola.
 */

var stdin = process.stdin, //Entrada
    stdout = process.stdout, //Salida
    nombre = ''

stdin.setEncoding('utf-8')

function Saludar(){
    console.log('¿Cómo te llamas?')
    stdin.resume() //Espera entrada del usuario
    stdin.once('data', MostrarEnConsola) //Mientras haya data para leer, mostrar
}

function MostrarEnConsola(textoLeido){
    nombre = textoLeido.toString().trim() //textoLeído es lo que ingresó el usuario
    stdout.write(`Hola ${nombre}`) //Muestra en consola
    process.exit() //Salgo del proceso
}

Saludar()