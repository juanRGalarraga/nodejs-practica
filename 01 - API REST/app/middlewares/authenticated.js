    'use strict'

    var jwt = require('jwt-simple');
    var moment = require('moment');
    var aConfig = require('../config/config');
    var userService = require('../services/UserService');
    var loggerService = require('./../services/LoggerService');

    exports.authenticated = function(req, res, next) {
        var usuario = null;
        if(!req.headers.authorization) {
            loggerService.log_error('La petición no tiene la cabecera de autenticación en: '+aConfig['host']+'/api/'+ req.route.path);
            return res.status(403).send({
                message: 'La petición no tiene la cabecera de autenticación'
            });
        }

        var token = req.headers.authorization.replace(/['"]+/g, '');
        var existe_bearer = token.search('Bearer');

        if(existe_bearer != -1) {
            token = token.replace('Bearer ', '');
        }else{
            loggerService.log_error('Token incorrecto');
            return res.status(403).send({
                message: 'Token incorrecto'
            });
        }

        try {
            var payload = jwt.decode(token, aConfig['key']);
            if(payload.exp <= moment().unix()) {
                loggerService.log_error('El token ha expirado');
                return res.status(403).send({
                    message: 'El token ha expirado'
                });
            }
        }catch(ex){
            loggerService.log_error('Token incorrecto');
            return res.status(403).send({
                message: 'Token incorrecto'
            });
        }
        usuario = userService.getUserById(payload.sub);
        req.usuario = usuario;
        next();

    };