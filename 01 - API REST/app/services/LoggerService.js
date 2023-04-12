'use strict'

var logger = require('../config/logger.config');

var services = {
    log_request: function (options, body, statusCode) {
        var log = logger.getConfigLogger();
        if (statusCode >= 400) {
            log.error(JSON.stringify(options), body, statusCode);
        } else {
            log.info(JSON.stringify(options), body, statusCode);
        }
    },
    log_error: function (error) {
        var log = logger.getConfigLogger();
        log.warn(error);
    },
};

module.exports = services;