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
var fs_1 = __importDefault(require("fs"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var logger_1 = require("./utils/logger");
var constants_1 = require("./utils/constants");
var blockchain_1 = require("./blockchain");
var server_1 = require("./server");
var database_1 = require("./database");
var app = express_1.default();
app.use(express_1.default.json({
    limit: '50mb'
}));
app.use(express_fileupload_1.default());
app.use(express_1.default.static('public'));
app.use(cors_1.default());
console.clear();
app.get('/status', function (_, response) {
    logger_1.logger.info('Request to send the status of the server; OK');
    logger_1.logger.http('alskjdhfasjdkf');
    response.sendStatus(200);
});
// New petition to change the pixel to the leader, this method should only be used for and by the
// leader server.
app.post('/newPixel', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var signatureList, isValid, word;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.logger.info('Request on the leader to register a new pixel on the network 🎉');
                signatureList = request.body.signatureList;
                return [4 /*yield*/, blockchain_1.checkSignatureList(signatureList)];
            case 1:
                isValid = _a.sent();
                if (!isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, blockchain_1.getWordForProofOfWork()];
            case 2:
                word = _a.sent();
                response.send(word);
                // Send the word to the request instance and toss the petition to the queue of work
                blockchain_1.addToQueue({
                    serverId: request.body.serverId,
                    pixelColor: request.body.pixelColor,
                    pixelX: request.body.pixelX,
                    pixelY: request.body.pixelY,
                    word: word
                });
                return [3 /*break*/, 4];
            case 3:
                logger_1.logger.info('The request to register a new pixel on the network has been marked as invalid 😥');
                response.sendStatus(400);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/finishedProofOfWork', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var workInformation, isValid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.logger.info('Request on the leader to evaluate a proof of work');
                workInformation = blockchain_1.checkIdInQueue(request.body.serverId);
                if (!workInformation) return [3 /*break*/, 2];
                logger_1.logger.info('Writting the file to a temporal place');
                fs_1.default.writeFileSync('./pow.txt', Buffer.from(request.body.pow.data));
                logger_1.logger.info('Finished');
                return [4 /*yield*/, blockchain_1.sendPowToServers(request.body.serverId, workInformation.word)];
            case 1:
                isValid = _a.sent();
                if (isValid) {
                    response.sendStatus(200);
                    blockchain_1.sendNewPixelToAllInstances(workInformation);
                }
                else {
                    logger_1.logger.warn('The proof of work is not valid 👻');
                    response.sendStatus(400);
                }
                return [3 /*break*/, 3];
            case 2:
                logger_1.logger.warn('Server not in the queue of work!');
                response.sendStatus(400);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// ================================= Non leader methods ==========================================
app.get('/randomNumber', function (request, response) {
    logger_1.logger.info('Request to get a random number from this server');
    response.send({
        number: Math.round(Math.random() * 100)
    });
});
app.post('/sendNewPixel', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger_1.logger.info('Request to reigster a new pixel to the leader');
        server_1.sendNewPixelRequest(request.body);
        response.sendStatus(200);
        return [2 /*return*/];
    });
}); });
// Post petition to get the validity of all of the signatures sent from the leader with this server.
app.post('/verifySignatures', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var validity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.logger.info('Post request to compare some signatures with the signatures on this instance');
                console.log(request.body.signatureList);
                return [4 /*yield*/, blockchain_1.compareSignatureList(request.body.signatureList)];
            case 1:
                validity = _a.sent();
                logger_1.logger.warn("The validity of the signatures were " + validity);
                response.sendStatus(validity ? 200 : 400);
                return [2 /*return*/];
        }
    });
}); });
// Peticion que devuelve una palabra aleatoria del arreglo de palabras predefinidas
app.get('/word', function (_, response) {
    logger_1.logger.info('Request to get the selected word');
    var selectedWord = constants_1.WORDS[Math.floor(Math.random() * constants_1.WORDS.length)];
    logger_1.logger.info("The selected word is " + selectedWord);
    response.send({
        selectedWord: selectedWord
    });
});
// Check the file has been written correctly from the instance
app.post('/checkProofOfWork', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var validity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.logger.info('Request to check the proof of work of some instance');
                logger_1.logger.info('Writting the file to a temporal place');
                fs_1.default.writeFileSync('./pow.txt', Buffer.from(request.body.pow.data));
                logger_1.logger.info('Finished');
                return [4 /*yield*/, blockchain_1.validateProofOfWork(request.body.word)];
            case 1:
                validity = _a.sent();
                logger_1.logger.warn("The validity of the proof of work is " + validity);
                response.sendStatus(validity ? 200 : 400);
                return [2 /*return*/];
        }
    });
}); });
app.post('/setPixel', function (request, response) {
    logger_1.logger.info('Request to set a new pixel! 😲');
    var workInformation = request.body.workInformation;
    if (workInformation) {
        database_1.addPixelToRegistry({
            signature: request.body.signature,
            pixelX: workInformation.pixelX,
            pixelY: workInformation.pixelY,
            r: workInformation.pixelColor[0],
            g: workInformation.pixelColor[1],
            b: workInformation.pixelColor[2],
            a: workInformation.pixelColor[3]
        });
        response.sendStatus(200);
    }
    else {
        logger_1.logger.error('Something went wrong with the writing of the pixel. 😢');
        response.sendStatus(400);
    }
});
app.listen(constants_1.LOCAL_SERVER_PORT, function () {
    logger_1.logger.info("Instance server listening at port " + constants_1.LOCAL_SERVER_PORT);
});
