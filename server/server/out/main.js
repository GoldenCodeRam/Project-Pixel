"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Logger_1 = require("./utils/Logger");
var app = express_1.default();
var port = 8080;
console.clear();
app.use(express_1.default.static('public'));
app.use(cors_1.default());
app.post('/image', function (request, response) {
    Logger_1.logger.info('Post request to upload the pixelart image');
    response.sendStatus(200);
});
app.get('/status', function (_, response) {
    Logger_1.logger.info('Request to send the status of the server; OK');
    response.sendStatus(200);
});
app.listen(port, function () {
    Logger_1.logger.info("Instance server listening at port " + port);
});
