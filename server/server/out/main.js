"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var Logger_1 = require("./utils/Logger");
var app = express_1.default();
var port = 8080;
var fileUpload = require('express-fileupload');
app.use(fileUpload());
// parse application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
var words = ['Mandarina', 'Banano', 'Pera', 'Manzana', 'Limon'];
var servers = [8081, 8082, 8083];
console.clear();
app.use(express_1.default.static('public'));
app.use(cors_1.default());
app.post('/sendNewPixel', function (request, response) {
    Logger_1.logger.info('Post request to upload the pixelart image');
    Logger_1.logger.info('Recibida info del pixel 👨‍🎨');
    console.log(request.body);
});
app.get('/status', function (_, response) {
    Logger_1.logger.info('Request to send the status of the server; OK');
    response.sendStatus(200);
});
// Peticion que verifica si un archivo de firmas coincide con el del servido actual y retorna Ok o Todo mal
app.post('verifySignature', function (req, res) {
    // const signature = req.body.signature
    // Verificar que coincidan las firmas de la imagen
    res.json({ message: true });
});
// Peticion que devuelve una palabra aleatoria del arreglo de palabras predefinidas
app.get('/word', function (req, res) {
    var selectedWord = words[Math.floor((Math.random() * (5 - 0)) + 0)];
    Logger_1.logger.info("La palabra escogida es " + selectedWord);
    res.send(selectedWord);
});
// Peticion inicial a la que accede el cliente para solicitar cambiar un pixel
app.post('/changePixel', function (req, res) {
    var img = req.files.file;
    var info = req.body.info;
    info = JSON.parse(info);
    Logger_1.logger.info('Informacion de firmas recibida correctamente');
    img.mv("" + img.name, function () {
        Logger_1.logger.info('Imagen recibida correctamente');
        res.json('Informacion recibida');
    });
    sendSignature(info);
});
// Funcion que se encarga de enviar la firma a todos los servidores para su verificacion
function sendSignature(signature) {
    var cont = 0;
    servers.forEach(function () {
        axios_1.default.post("http://localhost:" + servers + "/verifySignature", {
            data: signature
        }).then(function (response) {
            if (response.data.message) {
                cont = cont + 1;
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    });
    if (cont >= ((servers.length / 2) + 1)) {
        // Como las firmas son reales, se procede a solicitar la prueba de trabajo
        Logger_1.logger.info('La firma de la imagen del cliente es correcta, asignando prueba de trabajo...');
        pow();
    }
    else {
        // Pailas
        Logger_1.logger.info('La firma de la imagen del cliente no coincide con la mayoria de los servidores');
    }
}
// Funcion que se encarga de pedir a todos una palabra para asignar la prueba de trabajo al cliente que solicite modificar el archivo
function pow() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            servers.forEach(function () {
                axios_1.default.post("http://localhost:" + servers + "/word")
                    .then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                    console.log(error);
                });
            });
            return [2 /*return*/];
        });
    });
}
app.listen(port, function () {
    Logger_1.logger.info("Instance server listening at port " + port);
});
