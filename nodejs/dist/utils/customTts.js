"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var AudioResources = /** @class */ (function () {
    function AudioResources() {
        this.resources = {};
    }
    AudioResources.prototype.getResourceKey = function (text, voiceInfo) {
        var _a, _b, _c, _d, _e;
        return [
            (_a = voiceInfo.lang) !== null && _a !== void 0 ? _a : "",
            (_b = voiceInfo.speaker) !== null && _b !== void 0 ? _b : "",
            (_c = voiceInfo.emotion) !== null && _c !== void 0 ? _c : "Neutral",
            (_d = voiceInfo.speed) !== null && _d !== void 0 ? _d : 1,
            (_e = voiceInfo.variation) !== null && _e !== void 0 ? _e : 0,
            text,
        ].join("|");
    };
    AudioResources.prototype.appendJson = function (folder, pack) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var errors, i, _i, _c, phrase, audioFile, resourceKey;
            return __generator(this, function (_d) {
                errors = [];
                i = 0;
                for (_i = 0, _c = (_a = pack.phrases) !== null && _a !== void 0 ? _a : []; _i < _c.length; _i++) {
                    phrase = _c[_i];
                    i++;
                    // валидация
                    if (phrase.phrase === undefined) {
                        errors.push("For " + i + " phrase field 'phrase' is undefined");
                        continue;
                    }
                    if (phrase.audio === undefined) {
                        errors.push("For " + i + " phrase field 'audio' is undefined");
                        continue;
                    }
                    audioFile = path.join(folder, phrase.audio);
                    if (!fs.existsSync(audioFile)) {
                        errors.push("For " + i + " phrase \"" + phrase.phrase + "\" file not found");
                        continue;
                    }
                    phrase.voice = __assign(__assign({}, pack.voice), phrase.voice);
                    resourceKey = this.getResourceKey(phrase.phrase, (_b = phrase.voice) !== null && _b !== void 0 ? _b : {});
                    if (resourceKey in this.resources) {
                        // дубликат - не ошибка
                        console.warn("Skip", i, "phrase because it's duplicate");
                        continue;
                    }
                    this.resources[resourceKey] = audioFile;
                }
                if (errors.length > 0) {
                    console.error("Was errors " + JSON.stringify(errors));
                }
                return [2 /*return*/];
            });
        });
    };
    AudioResources.prototype.addFolder = function (folder) {
        return __awaiter(this, void 0, void 0, function () {
            var files, _i, files_1, fileName, fname;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = fs.readdirSync(folder);
                        _i = 0, files_1 = files;
                        _a.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 4];
                        fileName = files_1[_i];
                        if (!(path.extname(fileName) === ".json")) return [3 /*break*/, 3];
                        fname = path.join(folder, fileName);
                        console.log("Parsing " + fname);
                        return [4 /*yield*/, this.appendJson(folder, JSON.parse(fs.readFileSync(fname).toString()))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AudioResources.prototype.GetPath = function (text, voiceInfo) {
        var key = this.getResourceKey(text, voiceInfo);
        var fpath = this.resources[key];
        if (fpath === undefined)
            throw new Error("Failed to get " + key);
        return fpath;
    };
    return AudioResources;
}());
exports.default = AudioResources;
