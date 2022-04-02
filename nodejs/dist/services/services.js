"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var scenarios_1 = __importDefault(require("./scenarios"));
var tasks_1 = __importDefault(require("./tasks"));
var Services = /** @class */ (function () {
    function Services(repos) {
        var _this = this;
        this.dispose = function () {
            _this.tasks.dashaApi.dispose();
        };
        this.scenarios = new scenarios_1.default(repos.scenarios);
        this.tasks = new tasks_1.default(repos);
    }
    return Services;
}());
exports.default = Services;
