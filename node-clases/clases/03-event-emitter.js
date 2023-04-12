'use strict'

var EventEmitter = require('events'),
    pub = new EventEmitter()

pub.on('eventOne', (eventName = 'sin nombre') => {
    console.log(`Soy el evento ${eventName}`)
})

pub.once('eventTwo', (digit = 3) => {
    console.log(`Soy el número ${digit}`)
})

pub.emit('eventOne', 'del sistema')
pub.emit('eventTwo', 4)
// pub.removeAllListeners('eventOne')