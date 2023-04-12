'use strict'

var app = require('./app');

//Crear el servidor
app.listen(app.get('settings').port, () => {
    console.log(`El servidor esta corriendo de manera ${app.get('settings').env} en ${app.get('settings').host}`);
});