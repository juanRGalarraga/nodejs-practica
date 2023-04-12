var DB = require('./DB');

class Model extends DB {

    rows = [];

    constructor(){
        super.construct();
        if(this.mainTable == null){
            return console.error("Falta establecer la tabla principal.");
        }
    }

    getById(id){
        try {

            if(isNaN(id)){
                throw new Error("ID recibido no es numérico");
            }
    
            this.connection.query(`SELECT * FROM ${$this.mainTable} WHERE id = ?`, id, (error, results, fields) => {
                if(error) throw new Error(error);

                console.log("Consulta ejecutada");
                this.rows = results;
                return results;
            });

        } catch(error) {
            console.error(error);
        }
    }
}

// exports.Model = Model;
module.exports = Model;