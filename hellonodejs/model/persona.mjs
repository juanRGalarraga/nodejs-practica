import DB from './db.mjs';
import TBL_BACKEND_PERSONAS from  '../system/dblist';

export default class Persona extends DB {

    mainTable = TBL_BACKEND_PERSONAS;

    constructor(){
        super();
        if(this.mainTable == null){
            return console.error("Falta establecer la tabla principal.");
        }
    }

    getById(id, callback){
        try {

            if(isNaN(id)){
                throw new Error("ID recibido no es numérico");
            }

            this.connection.query(`SELECT * FROM ${this.mainTable} WHERE id = ?`, id, callback);

        } catch(error) {
            console.error(error);
        }
    }
}