import * as mysql from 'mysql';
import * as dbConfig from '../system/dbconfig.mjs';

export default class DB {

    connection = null;
    mainTable = null;

    constructor(){
        this.connection = mysql.createConnection({
            host        :   dbConfig.HOST,
            user        :   dbConfig.USER,
            password    :   dbConfig.PASSWORD,
            database    :   dbConfig.DATABASE
        });
    }

    connect(){
        this.connection.connect((err) => {
            return (err) ? 
                    console.log(`Error al Conectarse a MySQL: ${err.stack}`) : 
                    console.log(`Conexión establecida con MySQL N°: ${myConn.threadId}`)
        });
    }
}