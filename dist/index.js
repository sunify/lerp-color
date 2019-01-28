"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lerp_array_1 = __importDefault(require("lerp-array"));
var utils_1 = require("./utils");
var utils_2 = require("./utils");
exports.isColor = utils_2.isColor;
var lerpColor = function (start, end, percent) {
    if (percent === 0 || start === end) {
        return start;
    }
    if (percent === 1) {
        return end;
    }
    var startColor = utils_1.parseColor(start);
    var endColor = utils_1.parseColor(end);
    if (startColor && endColor) {
        return utils_1.stringifyColor(lerp_array_1.default(startColor, endColor, percent), end);
    }
    return undefined;
};
exports.default = lerpColor;
