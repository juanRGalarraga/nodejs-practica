'use strict'

/**
 * Busca en el JSON un usuario con el ID que llega por parámetro
 */

var usuarios = require('../assets/usuarios.json')

exports.getUserById = function(userId) {

    var usuario = null;

    for(var i = 0; i < usuarios.values.length; i++) {
        if(usuarios.values[i].id === userId) {
            usuario = usuarios.values[i];
        }
    }
    return usuario.apiKey;

}