"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Logger_1 = require("./utils/Logger");
var app = express_1.default();
var port = 8080;
console.clear();
app.get('/status', function (_, response) {
    response.sendStatus(200);
});
app.listen(port, function () {
    Logger_1.logger.info("Instance server listening at port " + port);
});
