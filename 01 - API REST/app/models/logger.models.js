var mysql = require('mysql');
var aConfig = require('../config/config');
var datosConfig = {
    host: aConfig['db_host'],
    user: aConfig['db_user'],
    password: aConfig['db_password'],
    database: aConfig['db_database']
};

var connection = mysql.createConnection(datosConfig);

var model = {

    guardar: function(request, response, http_status) {
        
        if(http_status >= 400) {
            var json_response = JSON.parse(response);
            json_response.message =  json_response.message.replace("'", '`');
            if(json_response.sub_errors != null) {
                json_response.sub_errors[0].message = json_response.sub_errors[0].message.replace("'", "");
            }
            
            response = JSON.stringify(json_response);
        } 
        
        var sql = "INSERT INTO logs(request, response, http_status) VALUES ('" + request + "','" + response + "','" + http_status + "')";
        console.log("sql insert", sql);
        connection.query(sql, function(err, result, fields) {
            if (err) throw err;
        });

    }

};

module.exports = model;