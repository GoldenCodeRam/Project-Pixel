"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var Database = /** @class */ (function () {
    function Database() {
        this._redisDatabase = redis_1.default.createClient({
            port: 6379,
            host: '127.0.0.1'
        });
    }
    return Database;
}());
exports.default = Database;
