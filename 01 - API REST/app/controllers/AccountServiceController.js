'use strict'

var validator = require('validator');
var request = require('request');
var aConfig = require('../../app/config/config');
var logger = require('../models/logger.models');
var loggerService = require('./../services/LoggerService');

var controller = {

    createAccount: function(req, res) {

        var params = req.body;
        var key = req.usuario;

        try {
            var validate_accountName = validator.isEmpty(params.accountName) || !validator.isLength(params.accountName, { min:1, max:100 });
            var validate_currencyCode = validator.isEmpty(params.currencyCode);
            var validate_poolId = validator.isEmpty(params.poolId.toString()) || !validator.isNumeric(params.poolId.toString());
        }catch(ex) {
            loggerService.log_error('Compruebe que está enviando los parametros accountName, currencyCode, poolId en: '+aConfig['host']+'/api'+ req.route.path);    
            return res.status(400).send({
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_accountName || validate_currencyCode || validate_poolId) {
            if(validate_accountName) {
                loggerService.log_error('accountName está vacio o el largo no esta en el rango [1-100] en: '+aConfig['host']+'/api'+ req.route.path);    
            }
            if(validate_currencyCode) {
                loggerService.log_error('currencyCode está vacio en: '+aConfig['host']+'/api'+ req.route.path);    
            }
            if(validate_poolId) {
                loggerService.log_error('poolId está vacio o no es un valor numerico en: '+aConfig['host']+'/api'+ req.route.path);    
            }

            return res.status(400).send({
                message: 'Los datos son incorrectos'
            });
        }

        var parametrosEasy = {
            accountName: params.accountName,
            currencyCode: params.currencyCode,
            poolId: params.poolId
        };

        var options = {
            'method': 'POST',
            'url': aConfig['base_url_easy']+'/account/create',
            'headers': { 'ApiKey': key, 'Content-Type': 'application/json' },
            body: JSON.stringify(parametrosEasy)
        };

        request(options, function (error, response) {
            res.set("Content-Type", "application/json");
            if(error) {
                res.status(response.statusCode).send({
                    data: error
                });
            }else{
                loggerService.log_request(options, response.body, response.statusCode);
                logger.guardar(JSON.stringify(options), response.body, response.statusCode);
                res.status(response.statusCode).send({
                    data: JSON.parse(response.body)
                });
            }
        });

    }

};

module.exports = controller;