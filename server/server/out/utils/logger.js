"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverLogger = exports.databaseLogger = exports.blockchainLogger = exports.logger = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf;
var timezone = function () {
    return new Date().toLocaleDateString('es-CO', {
        timeZone: 'America/Bogota',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
};
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    return level + " [" + timestamp + " : " + label + "]\n" + message;
});
var logger = winston_1.createLogger({
    format: combine(label({ label: "Instance Server \uD83E\uDD16 - Server " + process.env.PORT }), timestamp({
        format: timezone
    }), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.Http({
            host: process.env.LOGGING_SERVER,
            port: parseInt(process.env.LOGGING_SERVER_PORT),
            path: '/logging'
        })
    ]
});
exports.logger = logger;
var serverLogger = winston_1.createLogger({
    format: combine(label({ label: "Server \uD83E\uDDF0 - Server " + process.env.PORT }), timestamp({
        format: timezone
    }), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.Http({
            host: process.env.LOGGING_SERVER,
            port: parseInt(process.env.LOGGING_SERVER_PORT),
            path: '/logging'
        })
    ]
});
exports.serverLogger = serverLogger;
var blockchainLogger = winston_1.createLogger({
    format: combine(label({ label: "Blockchain \uD83D\uDD17 - Server " + process.env.PORT }), timestamp({
        format: timezone
    }), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.Http({
            host: process.env.LOGGING_SERVER,
            port: parseInt(process.env.LOGGING_SERVER_PORT),
            path: '/logging'
        })
    ]
});
exports.blockchainLogger = blockchainLogger;
var databaseLogger = winston_1.createLogger({
    format: combine(label({ label: "Database \uD83D\uDDC3\uFE0F - Server " + process.env.PORT }), timestamp({
        format: timezone
    }), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.Http({
            host: process.env.LOGGING_SERVER,
            port: parseInt(process.env.LOGGING_SERVER_PORT),
            path: '/logging'
        })
    ]
});
exports.databaseLogger = databaseLogger;
