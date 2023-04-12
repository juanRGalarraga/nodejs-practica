import DB from './db.mjs';
import * as fs from 'node:fs';
import {TBL_LISTA_DE_PRECIOS} from  '../system/dblist.mjs';

export default class ListaDePrecios extends DB {

    mainTable = TBL_LISTA_DE_PRECIOS;
    records = [];

    constructor(){
        super();
        if(this.mainTable == null){
            return console.error("Falta establecer la tabla principal.");
        }
    }

    getall(callback){
        try {
            this.connection.query(`SELECT * FROM ${this.mainTable}`, callback);
        } catch(error) {
            console.error(error);
        }
    }

    creatCSV(data){
        let filename = "../lista.csv";
        fs.appendFileSync(filename, data);


    }
}