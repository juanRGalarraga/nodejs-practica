'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var aConfig = require('../config/config');

exports.createToken = function(usuario) {

    var payload = {
        sub: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()
    };

    return jwt.encode(payload, aConfig['key']);

};