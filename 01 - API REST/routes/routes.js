'use strict'


var express = require('express');
var router = express.Router();

//Para manejos de archivos enviados al servidor. 
//Otra alternativa es multer, ya que en la documentación de connect-multipary el propio
//creador recomienda no usarlo :|
// var multipart = require('connect-multiparty');
// var md_multipart = multipart();

//Me traigo el middleware que pide el token del usuario
var md_auth = require('../app/middlewares/authenticated');
var apiController = require('../app/controllers/apiController');
var accountServiceController = require('../app/controllers/AccountServiceController');

//Ejemplo de login para este servidor
router.post('/login', apiController.login);

//Ejemplo de conexión a una api externa
router.post('/account/create', md_auth.authenticated, accountServiceController.createAccount);

module.exports = router;
