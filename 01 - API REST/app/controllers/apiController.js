'use strict'

/**
 * Controlador que logea el usuario del WS
 */

var validator = require('validator');
var usuarios = require('../assets/usuarios.json');
var aConfig = require('./../config/config');
var jwt = require('../services/jwt');
var loggerService = require('./../services/LoggerService');

var controller = {

    login: function(req, res) {
        //Obtengo los datos
        var params = req.body;
        try {
            //Validación de datos
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }catch(ex){
            loggerService.log_error('Compruebe que se envian los parametros email y password en: '+aConfig['host']+'/api'+ req.route.path);
            return res.status(400).send({
                message: 'Faltan datos por enviar'
            });
        }

        if(!validate_email || !validate_password) {
            if(!validate_email){
                loggerService.log_error('El email está vacio o no es un email valido en: '+aConfig['host']+'/api'+ req.route.path);
            }
            if(!validate_password) {
                loggerService.log_error('La password está vacia en: '+aConfig['host']+'/api'+ req.route.path);
            }

            return res.status(400).send({
                message: 'Los datos son incorrectos'
            });
        }

        for(var i = 0; i < usuarios.values.length; i++) {
            if(usuarios.values[i].email === params.email && usuarios.values[i].password === params.password) {
                var usuario = usuarios.values[i];
            }
        }

        if(usuario != null) {
            var token = jwt.createToken(usuario);
            loggerService.log_error('Creacion token correcta: ' + token);
            return res.status(200).send({
                token
            });
        }else{
            loggerService.log_error('Las credenciales son incorrectas en: '+aConfig['host']+'/api'+ req.route.path);
            return res.status(400).send({
                message: 'Las credenciales son incorrectas'
            });
        }

    },

};

module.exports = controller;