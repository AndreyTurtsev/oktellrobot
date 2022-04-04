"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var dasha = __importStar(require("@dasha.ai/sdk"));
var amoBuf_1 = __importDefault(require("../domain/amoBuf"));
var logger_1 = __importDefault(require("../utils/logger"));
var fs = require('fs');
var customTts_1 = __importDefault(require("../utils/customTts"));
var TasksService = /** @class */ (function () {
    function TasksService(repo) {
        var _this = this;
        this.add = function (task) { return __awaiter(_this, void 0, void 0, function () {
            var scenario, taskRes, buf, amoBufRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.scenarios.getById(task.scenarioID)
                        //если сценарий не существует, то возвращаем ошибку
                    ];
                    case 1:
                        scenario = _a.sent();
                        //если сценарий не существует, то возвращаем ошибку
                        if (scenario == null) {
                            logger_1.default.error("error adding new task: unknown scenario");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.repository.tasks.add(task)
                            //создаем задание в буфере, на получение из лида информации для php сервиса.
                        ];
                    case 2:
                        taskRes = _a.sent();
                        if (!(taskRes && task._id)) return [3 /*break*/, 4];
                        buf = new amoBuf_1.default("", 2, task.leadID, task._id.toHexString());
                        return [4 /*yield*/, this.repository.amoBuffer.add(buf)];
                    case 3:
                        amoBufRes = _a.sent();
                        if (amoBufRes) {
                            return [2 /*return*/, true];
                        }
                        else {
                            logger_1.default.error("error adding amoBuf for new task");
                            //удаляем таску в таком случае
                            this.repository.tasks.delete(task._id.toHexString());
                            return [2 /*return*/, false];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.test = function (city) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.makeCall("+79627681333", city, this.dashaApi);
                return [2 /*return*/];
            });
        }); };
        this.update = function (task) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.tasks.update(task)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.delete = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.tasks.delete(id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.list = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.tasks.list()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.makeCalls = function () { return __awaiter(_this, void 0, void 0, function () {
            var callsList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.tasks.getTasksToCall()];
                    case 1:
                        callsList = _a.sent();
                        callsList.forEach(function (task) { return __awaiter(_this, void 0, void 0, function () {
                            var scenario;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.repository.scenarios.getById(task.scenarioID)];
                                    case 1:
                                        scenario = _a.sent();
                                        if (!scenario) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.makeCall(this.formatPhone(task.phone), task.city, this.dashaApi)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, true];
                }
            });
        }); };
        this.formatPhone = function (phoneInput) {
            var phone = phoneInput.replace(/[^0-9\.]+/g, '');
            if (phone[0] == '8') {
                phone = "+7" + phone.substring(1);
            }
            else if (phone[0] == '7') {
                phone = "+" + phone;
            }
            return phone;
        };
        this.repository = repo;
        dasha.deploy('./dasha').then(function (dashaDep) {
            _this.dashaApi = dashaDep;
        });
    }
    //функция для совершения звонка
    TasksService.prototype.makeCall = function (phone, city, dashaApi) {
        return __awaiter(this, void 0, void 0, function () {
            var intents, audio, conv, logFile, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        intents = [];
                        audio = new customTts_1.default();
                        audio.addFolder("audio");
                        dashaApi.ttsDispatcher = function (conv) { return "custom"; };
                        dashaApi.customTtsProvider = function (text, voice) { return __awaiter(_this, void 0, void 0, function () {
                            var fname;
                            return __generator(this, function (_a) {
                                console.log("Tts asking for phrase with text " + text + " and voice " + JSON.stringify(voice));
                                fname = audio.GetPath(text, voice);
                                console.log("Found in file " + fname);
                                return [2 /*return*/, dasha.audio.fromFile(fname)];
                            });
                        }); };
                        dashaApi.connectionProvider = function (conv) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (!(conv.input.phone === "chat")) return [3 /*break*/, 2];
                                        _c = (_b = dasha.chat).connect;
                                        return [4 /*yield*/, dasha.chat.createConsoleChat()];
                                    case 1:
                                        _a = _c.apply(_b, [_d.sent()]);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a = dasha.sip.connect(new dasha.sip.Endpoint("default"));
                                        _d.label = 3;
                                    case 3: return [2 /*return*/, _a];
                                }
                            });
                        }); };
                        return [4 /*yield*/, dashaApi.start({ concurrency: 10 })];
                    case 1:
                        _a.sent();
                        conv = dashaApi.createConversation({ phone: phone, city: city });
                        if (conv.input.phone !== 'chat')
                            conv.on('transcription', console.log);
                        return [4 /*yield*/, fs.promises.open('./log.txt', 'w')];
                    case 2:
                        logFile = _a.sent();
                        return [4 /*yield*/, logFile.appendFile('#'.repeat(100) + '\n')];
                    case 3:
                        _a.sent();
                        conv.on('transcription', function (entry) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (entry.speaker == "human") {
                                            console.log(entry);
                                            console.log(entry.text);
                                        }
                                        return [4 /*yield*/, logFile.appendFile(entry.speaker + ": " + entry.text + "\n")];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        conv.on('debugLog', function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var logEntry;
                            var _a, _b, _c, _d, _e, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        if (!(((_a = event === null || event === void 0 ? void 0 : event.msg) === null || _a === void 0 ? void 0 : _a.msgId) === 'RecognizedSpeechMessage')) return [3 /*break*/, 2];
                                        if ((_c = (_b = event === null || event === void 0 ? void 0 : event.msg) === null || _b === void 0 ? void 0 : _b.results[0]) === null || _c === void 0 ? void 0 : _c.facts) {
                                            (_e = (_d = event === null || event === void 0 ? void 0 : event.msg) === null || _d === void 0 ? void 0 : _d.results[0]) === null || _e === void 0 ? void 0 : _e.facts.forEach(function (fact) {
                                                if (fact.intent) {
                                                    intents.push(fact.intent);
                                                }
                                            });
                                        }
                                        logEntry = (_g = (_f = event === null || event === void 0 ? void 0 : event.msg) === null || _f === void 0 ? void 0 : _f.results[0]) === null || _g === void 0 ? void 0 : _g.facts;
                                        return [4 /*yield*/, logFile.appendFile(JSON.stringify(logEntry, undefined, 2) + '\n')];
                                    case 1:
                                        _h.sent();
                                        _h.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, conv.execute()];
                    case 4:
                        result = _a.sent();
                        console.log(result.output);
                        if (result.output.serviceStatus == "Done") {
                            console.log("звонок совершен");
                            console.log(intents);
                        }
                        else {
                            console.log("не дозвон");
                        }
                        return [4 /*yield*/, dashaApi.stop()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, logFile.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TasksService;
}());
exports.default = TasksService;
