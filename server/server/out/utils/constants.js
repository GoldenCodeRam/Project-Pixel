"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_GATEWAY = exports.LOCAL_SERVER_PORT = exports.LEADER_PORT = exports.SERVER_PORTS = exports.WORDS = void 0;
var WORDS = ['Mandarina', 'Banano', 'Pera', 'Manzana', 'Limon'];
exports.WORDS = WORDS;
var SERVER_PORTS = [8081, 8082, 8083, 8084];
exports.SERVER_PORTS = SERVER_PORTS;
var LEADER_PORT = 8081;
exports.LEADER_PORT = LEADER_PORT;
// Todo: Change the local server port to be 8080 before building the Docker container
var LOCAL_SERVER_PORT = 8080;
exports.LOCAL_SERVER_PORT = LOCAL_SERVER_PORT;
var SERVER_GATEWAY = process.env.GATEWAY || 'localhost';
exports.SERVER_GATEWAY = SERVER_GATEWAY;
