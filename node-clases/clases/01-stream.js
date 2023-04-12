'use strict'

var fs = require('fs')
const readStream = fs.createReadStream('./assets/archivo.txt')
const writeStream = fs.createWriteStream('./assets/archivo-copia.txt')

readStream.pipe(writeStream)
readStream.setEncoding('utf-8')
readStream
.on('data', (chunk) => {
    console.log(`Se han leído ${chunk.length} caracteres.`)
})
.on('end', () => {
    console.log('El archivo se ha terminado de leer')
    writeStream.end()
})
.on('error', () => {
    console.log('Ocurrió un error al leer el archivo')
})
