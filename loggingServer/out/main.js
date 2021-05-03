"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
app.get('/logging', function (request, response) {
    console.log('New request for the logs!');
});
app.listen(3000, function () {
    console.clear();
    console.log('Logging server listening on port 3000');
});
