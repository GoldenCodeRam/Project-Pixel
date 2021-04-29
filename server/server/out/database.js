"use strict";
<<<<<<< HEAD
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
exports.addPixelToRegistry = exports.getStoredPixels = void 0;
var util_1 = require("util");
var redis_1 = __importDefault(require("redis"));
var logger_1 = require("./utils/logger");
var redisDatabase = redis_1.default.createClient({
    port: 6379,
    host: 'redis'
});
var keysAsync = util_1.promisify(redisDatabase.keys).bind(redisDatabase);
var getAsync = util_1.promisify(redisDatabase.get).bind(redisDatabase);
var setAsync = util_1.promisify(redisDatabase.set).bind(redisDatabase);
function getStoredPixels() {
    return __awaiter(this, void 0, void 0, function () {
        var storedPixels, reply, _i, reply_1, key, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.databaseLogger.info('Getting stored pixels from Redis server');
                    storedPixels = [];
                    if (!redisDatabase.connected) return [3 /*break*/, 5];
                    return [4 /*yield*/, keysAsync('*').catch(function (error) {
                            logger_1.databaseLogger.error('Something went wrong getting the signatures from this Redis server');
                            console.log(error);
                        })];
                case 1:
                    reply = _a.sent();
                    if (!reply) return [3 /*break*/, 5];
                    _i = 0, reply_1 = reply;
                    _a.label = 2;
                case 2:
                    if (!(_i < reply_1.length)) return [3 /*break*/, 5];
                    key = reply_1[_i];
                    return [4 /*yield*/, getSignatureFromKey(key)];
                case 3:
                    signature = _a.sent();
                    if (signature)
                        storedPixels.push(signature);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, storedPixels];
            }
        });
    });
}
exports.getStoredPixels = getStoredPixels;
function addPixelToRegistry(newPixel) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!redisDatabase.connected) return [3 /*break*/, 2];
                    return [4 /*yield*/, setAsync(newPixel.signature, newPixel.pixelX + "," + newPixel.pixelY + "," + newPixel.r + "," + newPixel.g + "," + newPixel.b + "," + newPixel.a)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.addPixelToRegistry = addPixelToRegistry;
function getSignatureFromKey(key) {
    return __awaiter(this, void 0, void 0, function () {
        var reply, storedPixel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAsync(key).catch(function (error) {
                        logger_1.databaseLogger.error('Something went wrong getting a signature from this Redis server');
                        console.log(error);
                    })];
                case 1:
                    reply = _a.sent();
                    if (reply) {
                        storedPixel = reply.split(',');
                        return [2 /*return*/, {
                                signature: key,
                                pixelX: parseInt(storedPixel[0]),
                                pixelY: parseInt(storedPixel[1]),
                                r: parseInt(storedPixel[2]),
                                g: parseInt(storedPixel[3]),
                                b: parseInt(storedPixel[4]),
                                a: parseInt(storedPixel[5])
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
=======
// import redis from 'redis'
// export default class Database {
//   private _redisDatabase: redis.RedisClient
//   constructor () {
//     this._redisDatabase = redis.createClient({
//       port: 6379,
//       host: '127.0.0.1'
//     })
//   }
// }
>>>>>>> 461f827511c7f3544f5d476694ee1535bba504a5
