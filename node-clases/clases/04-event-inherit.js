'use strict'

let EventEmitter = require('events').EventEmitter

class Alphabet extends EventEmitter{
    ShowAlphabet(){
        this.emit('showAlphabetEvent')
    }
}

Alphabet.prototype.list = function(){
    const letters = ['a','b','c','d','e','f','g','h','i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let i = 0;
    console.log('Inicio del abecedario')
    const lettersInterval = setInterval(() => {
        console.log(letters[i])
        if(i == letters.length-1){ 
            clearInterval(lettersInterval) 
            console.log('Fin del abecedario')
        }
        i++;
    }, 100)
}

let alphabet = new Alphabet()

alphabet.on('showAlphabetEvent', () => {
    alphabet.list()
})

alphabet.ShowAlphabet()
