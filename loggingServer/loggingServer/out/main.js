"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: { origin: '*' },
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static('./public'));
app.get('/status', function (request, response) {
    console.log('server ok');
    response.sendStatus(200);
});
app.post('/logging', function (request, response) {
    console.log('New request POST for the logs!');
    console.log(request.body);
    io.emit('serverMessage', request.body);
    response.sendStatus(200);
});
io.on('connection', function (socket) {
    console.log('The frontend is connected!');
});
server.listen(8080, function () {
    console.clear();
    console.log('Logging server listening on port 8080');
});
