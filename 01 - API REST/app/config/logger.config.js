'use strict'

const log4js = require("log4js");
const path = require('path');
var fs = require('fs');
var moment = require('moment');

var config = {
  getConfigLogger: function () {
    var dir = path.join(__filename, '../../../');

    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      }catch(ex) {
        console.log('No se puede crear la carpeta logs');
        return true;
      }
      
    }

    var logName = path.join(__filename, '../../../logs/' + moment().format("YYYY-MM-DD") + '.log');

    log4js.configure({
      appenders: { DEBUG: { type: "file", filename: logName } },
      categories: { default: { appenders: ["DEBUG"], level: "debug" } }
    });


    const logger = log4js.getLogger("DEBUG");
    return logger;
  }
};

module.exports = config;