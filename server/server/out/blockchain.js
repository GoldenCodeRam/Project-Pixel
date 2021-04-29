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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewPixelToAllInstances = exports.validateProofOfWork = exports.sendPowToServers = exports.checkIdInQueue = exports.addToQueue = exports.compareSignatureList = exports.checkSignatureList = exports.getWordForProofOfWork = void 0;
var fs_1 = __importDefault(require("fs"));
var axios_1 = __importDefault(require("axios"));
var readline_1 = __importDefault(require("readline"));
var crypto_1 = __importDefault(require("crypto"));
var database_1 = require("./database");
var constants_1 = require("./utils/constants");
var logger_1 = require("./utils/logger");
var workQueue = [];
function getWordForProofOfWork() {
    return __awaiter(this, void 0, void 0, function () {
        var votedWords, _loop_1, _i, SERVER_PORTS_1, port, votes, mostVotedWord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.blockchainLogger.info('Instance passed the validation of signatures 🍾');
                    logger_1.blockchainLogger.info('Getting a word for it to make the proof of work');
                    votedWords = [];
                    _loop_1 = function (port) {
                        var selectedWord, response;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (port === constants_1.LEADER_PORT) {
                                        selectedWord = constants_1.WORDS[Math.floor(Math.random() * constants_1.WORDS.length)];
                                        votedWords.push(selectedWord);
                                        return [2 /*return*/, "continue"];
                                    }
                                    return [4 /*yield*/, axios_1.default.get("http://" + constants_1.SERVER_GATEWAY + ":" + port + "/word").catch(function (_) {
                                            logger_1.blockchainLogger.error("Error getting the word from port: " + port);
                                        })];
                                case 1:
                                    response = _b.sent();
                                    if (response) {
                                        votedWords.push(response.data.selectedWord);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, SERVER_PORTS_1 = constants_1.SERVER_PORTS;
                    _a.label = 1;
                case 1:
                    if (!(_i < SERVER_PORTS_1.length)) return [3 /*break*/, 4];
                    port = SERVER_PORTS_1[_i];
                    return [5 /*yield**/, _loop_1(port)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    votes = {};
                    mostVotedWord = votedWords[0];
                    votedWords.forEach(function (word) { votes[word] = (votes[word] || 0) + 1; });
                    votedWords.forEach(function (word) {
                        if (votes[word] > votes[mostVotedWord]) {
                            mostVotedWord = word;
                        }
                    });
                    console.log("The most voted word was " + mostVotedWord);
                    return [2 /*return*/, mostVotedWord];
            }
        });
    });
}
exports.getWordForProofOfWork = getWordForProofOfWork;
function checkSignatureList(signatureList) {
    return __awaiter(this, void 0, void 0, function () {
        var votes, _loop_2, _i, SERVER_PORTS_2, port;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.blockchainLogger.info('Checking signatures to validate a new block');
                    votes = 0;
                    _loop_2 = function (port) {
                        var validity, response;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(port === constants_1.LEADER_PORT)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, compareSignatureList(signatureList)];
                                case 1:
                                    validity = _b.sent();
                                    logger_1.blockchainLogger.warn("The validity of the signatures were " + validity);
                                    votes += validity ? 1 : 0;
                                    return [2 /*return*/, "continue"];
                                case 2: return [4 /*yield*/, axios_1.default.post("http://" + constants_1.SERVER_GATEWAY + ":" + port + "/verifySignatures", {
                                        signatureList: signatureList
                                    }).catch(function (error) {
                                        if (error.response.status === 400) {
                                            logger_1.blockchainLogger.warn("The server on port " + port + " marked the petition as invalid");
                                        }
                                        else {
                                            logger_1.blockchainLogger.error("Error getting the signature check from port: " + port);
                                        }
                                    })];
                                case 3:
                                    response = _b.sent();
                                    if (response) {
                                        logger_1.blockchainLogger.warn("The server on port " + port + " marked the petition as valid");
                                        votes += response.status === 200 ? 1 : 0;
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, SERVER_PORTS_2 = constants_1.SERVER_PORTS;
                    _a.label = 1;
                case 1:
                    if (!(_i < SERVER_PORTS_2.length)) return [3 /*break*/, 4];
                    port = SERVER_PORTS_2[_i];
                    return [5 /*yield**/, _loop_2(port)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("The votes approving the signature list are " + votes);
                    console.log("The votes needed to pass the check must be at least " + Math.round(constants_1.SERVER_PORTS.length / 2));
                    return [2 /*return*/, votes >= Math.round(constants_1.SERVER_PORTS.length / 2)];
            }
        });
    });
}
exports.checkSignatureList = checkSignatureList;
function compareSignatureList(signatureList) {
    return __awaiter(this, void 0, void 0, function () {
        var storedPixels, hasSignature, _i, storedPixels_1, storedPixel, _a, signatureList_1, signature;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.blockchainLogger.info('Comparing signatures from the ones of this server');
                    return [4 /*yield*/, database_1.getStoredPixels()];
                case 1:
                    storedPixels = _b.sent();
                    if (signatureList.length !== storedPixels.length) {
                        // First check: If the list of signatures and stored pixels is not the same, return
                        return [2 /*return*/, false];
                    }
                    else {
                        hasSignature = true;
                        for (_i = 0, storedPixels_1 = storedPixels; _i < storedPixels_1.length; _i++) {
                            storedPixel = storedPixels_1[_i];
                            hasSignature = false;
                            for (_a = 0, signatureList_1 = signatureList; _a < signatureList_1.length; _a++) {
                                signature = signatureList_1[_a];
                                if (signature === storedPixel.signature) {
                                    hasSignature = true;
                                }
                            }
                            if (!hasSignature) {
                                return [2 /*return*/, false];
                            }
                        }
                        return [2 /*return*/, hasSignature];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.compareSignatureList = compareSignatureList;
function addToQueue(information) {
    workQueue.push(information);
}
exports.addToQueue = addToQueue;
function checkIdInQueue(serverId) {
    var _loop_3 = function (work) {
        if (work.serverId === serverId) {
            workQueue = workQueue.filter(function (value) {
                return value !== work;
            });
            return { value: work };
        }
    };
    for (var _i = 0, workQueue_1 = workQueue; _i < workQueue_1.length; _i++) {
        var work = workQueue_1[_i];
        var state_1 = _loop_3(work);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return undefined;
}
exports.checkIdInQueue = checkIdInQueue;
function sendPowToServers(serverId, word) {
    return __awaiter(this, void 0, void 0, function () {
        var votes, _loop_4, _i, SERVER_PORTS_3, port;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.blockchainLogger.info('Checking proof of work to validate a new block with all instances');
                    votes = 0;
                    _loop_4 = function (port) {
                        var validity, response;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(port === constants_1.LEADER_PORT)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, validateProofOfWork(word)];
                                case 1:
                                    validity = _b.sent();
                                    logger_1.blockchainLogger.warn("The validity of the proof of work is " + validity);
                                    votes += validity ? 1 : 0;
                                    return [2 /*return*/, "continue"];
                                case 2:
                                    if (!(port !== serverId)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, axios_1.default.post("http://" + constants_1.SERVER_GATEWAY + ":" + port + "/checkProofOfWork", {
                                            word: word,
                                            pow: fs_1.default.readFileSync('./pow.txt')
                                        }).catch(function (error) {
                                            if (error.response.status === 400) {
                                                logger_1.blockchainLogger.warn("The server on port " + port + " marked the proof of work as invalid");
                                            }
                                            else {
                                                logger_1.blockchainLogger.error("Error getting the proof of work check from port: " + port);
                                            }
                                        })];
                                case 3:
                                    response = _b.sent();
                                    if (response) {
                                        logger_1.blockchainLogger.warn("The server on port " + port + " marked the proof of work as valid");
                                        votes += 1;
                                    }
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, SERVER_PORTS_3 = constants_1.SERVER_PORTS;
                    _a.label = 1;
                case 1:
                    if (!(_i < SERVER_PORTS_3.length)) return [3 /*break*/, 4];
                    port = SERVER_PORTS_3[_i];
                    return [5 /*yield**/, _loop_4(port)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("The votes approving the proof of work are " + votes);
                    console.log("The votes needed to pass the check must be at least " + Math.round(constants_1.SERVER_PORTS.length / 2));
                    return [2 /*return*/, votes >= Math.round(constants_1.SERVER_PORTS.length / 2)];
            }
        });
    });
}
exports.sendPowToServers = sendPowToServers;
function validateProofOfWork(word) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var counter, readInterface, readInterface_1, readInterface_1_1, line, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.blockchainLogger.info('Validating proof of work');
                    counter = 0;
                    readInterface = readline_1.default.createInterface({
                        input: fs_1.default.createReadStream('./pow.txt'),
                        crlfDelay: Infinity
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    readInterface_1 = __asyncValues(readInterface);
                    _b.label = 2;
                case 2: return [4 /*yield*/, readInterface_1.next()];
                case 3:
                    if (!(readInterface_1_1 = _b.sent(), !readInterface_1_1.done)) return [3 /*break*/, 5];
                    line = readInterface_1_1.value;
                    if (line !== word) {
                        return [2 /*return*/, false];
                    }
                    counter++;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(readInterface_1_1 && !readInterface_1_1.done && (_a = readInterface_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(readInterface_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, counter === 50000];
            }
        });
    });
}
exports.validateProofOfWork = validateProofOfWork;
function sendNewPixelToAllInstances(workInformation) {
    return __awaiter(this, void 0, void 0, function () {
        var newPixelSignature, _loop_5, _i, SERVER_PORTS_4, port;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.blockchainLogger.info('Sending the new pixel to all instances');
                    return [4 /*yield*/, getHashNumberFromServers()];
                case 1:
                    newPixelSignature = _a.sent();
                    console.log(newPixelSignature);
                    _loop_5 = function (port) {
                        var response;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (port === constants_1.LEADER_PORT) {
                                        database_1.addPixelToRegistry({
                                            signature: newPixelSignature,
                                            pixelX: workInformation.pixelX,
                                            pixelY: workInformation.pixelY,
                                            r: workInformation.pixelColor[0],
                                            g: workInformation.pixelColor[1],
                                            b: workInformation.pixelColor[2],
                                            a: workInformation.pixelColor[3]
                                        });
                                        return [2 /*return*/, "continue"];
                                    }
                                    return [4 /*yield*/, axios_1.default.post("http://" + constants_1.SERVER_GATEWAY + ":" + port + "/setPixel", {
                                            signature: newPixelSignature,
                                            workInformation: workInformation
                                        }).catch(function (_) {
                                            logger_1.blockchainLogger.error("The server on port " + port + " couldn't set the new pixel!");
                                        })];
                                case 1:
                                    response = _b.sent();
                                    if (response) {
                                        logger_1.blockchainLogger.info("New pixel registered on " + port + " \uD83E\uDD73\uD83C\uDF89");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, SERVER_PORTS_4 = constants_1.SERVER_PORTS;
                    _a.label = 2;
                case 2:
                    if (!(_i < SERVER_PORTS_4.length)) return [3 /*break*/, 5];
                    port = SERVER_PORTS_4[_i];
                    return [5 /*yield**/, _loop_5(port)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.sendNewPixelToAllInstances = sendNewPixelToAllInstances;
function getHashNumberFromServers() {
    return __awaiter(this, void 0, void 0, function () {
        var numbers, _loop_6, _i, SERVER_PORTS_5, port, hash, numberString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.blockchainLogger.info('Getting the number for the hash function from all servers');
                    numbers = [];
                    _loop_6 = function (port) {
                        var response;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (port === constants_1.LEADER_PORT) {
                                        numbers.push(Math.round(Math.random() * 100));
                                        return [2 /*return*/, "continue"];
                                    }
                                    return [4 /*yield*/, axios_1.default.get("http://" + constants_1.SERVER_GATEWAY + ":" + port + "/randomNumber").catch(function (_) {
                                            logger_1.blockchainLogger.error("The server on port " + port + " couldn't send the random number for the signature!");
                                        })];
                                case 1:
                                    response = _b.sent();
                                    if (response) {
                                        numbers.push(response.data.number);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, SERVER_PORTS_5 = constants_1.SERVER_PORTS;
                    _a.label = 1;
                case 1:
                    if (!(_i < SERVER_PORTS_5.length)) return [3 /*break*/, 4];
                    port = SERVER_PORTS_5[_i];
                    return [5 /*yield**/, _loop_6(port)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    logger_1.blockchainLogger.info('Numbers got:');
                    console.log(numbers);
                    hash = crypto_1.default.createHash('sha256');
                    numberString = numbers.join('');
                    hash.update(numberString);
                    return [2 /*return*/, hash.digest('hex')];
            }
        });
    });
}
