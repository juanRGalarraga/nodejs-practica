// import { express } from 'express';
import express from 'express';
import * as fs from 'fs';
import ListaDePrecios from './model/listaDePrecios.mjs';
import { createObjectCsvWriter } from 'csv-writer';

const app = express();
const port = 3000;

app.get('/persona/:id', (req, res) => {

    let id = req.params.id;
    if(isNaN(id)){ throw new Error('Not found ID'); }

    let Persona = require('./model/persona.mjs');
    let persona = new Persona();
    persona.getById(id, (error, rows) => {
        res.status(200).send(rows);
    });
});

app.get('/createCSV', (req, res) => {
    var startTime = new Date().getTime();
    var endTime;

    let listaDePrecios = new ListaDePrecios();
    // listaDePrecios.creatCSV();
    listaDePrecios.getall((error, rows) => {
        let time = new Date().getTime();
        let filename = "./ " + time + "_lista.csv";
        const headers = [ 
            {id: "id", title: "ID"},
            {id: "canal_id", title: "CANAL_ID"},
            {id: "region_id", title: "REGION_ID"},
            {id: "producto_id", title: "PRODUCTO_ID"},
            {id: "precio_publico", title: "PRECIO_PUBLICO"},
            {id: "precio_lista", title: "PRECIO_LISTA"},
            {id: "sys_fecha_alta", title: "SYS_FECHA_ALTA"},
            {id: "sys_fecha_modif", title: "SYS_FECHA_MODIF"},
            {id: "sys_usuario_id", title: "SYS_USUARIO_ID"}
        ];

        const csvWriter = createObjectCsvWriter({
            path: filename,
            header: headers
        });
        
        csvWriter.writeRecords(rows)
        .then(() => {
            console.log('CSV file created successfully');
            endTime = new Date().getTime();
            var totalTime = endTime - startTime;

            console.log(`El tiempo de ejecución fue de ${totalTime} milisegundos`);
        });
        console.log("Finalizado");
        // res.status(200).send(array);
    });
});

app.listen(port, () => {
    console.log('Listening on port http://localhost:' + port);
});