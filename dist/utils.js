"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rgb_hex_1 = __importDefault(require("rgb-hex"));
var hex_rgb_1 = __importDefault(require("hex-rgb"));
var hexColorRegex = /^#(?=[0-9a-fA-F]*$)(?:.{3}|.{4}|.{6}|.{8})$/;
var rgbColorRegex = /^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)$/;
var rgbaColorRegex = /^rgba\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?|\.\d+)\)$/;
exports.isColor = function (c) {
    return hexColorRegex.test(String(c)) ||
        rgbColorRegex.test(String(c)) ||
        rgbaColorRegex.test(String(c));
};
exports.parseColor = function (color) {
    if (hexColorRegex.test(color)) {
        var _a = hex_rgb_1.default(color, { format: 'array' }), r = _a[0], g = _a[1], b = _a[2], a = _a[3];
        return [r, g, b, a === 255 ? 1 : a];
    }
    if (rgbColorRegex.test(color)) {
        var match = color.match(rgbColorRegex);
        if (match) {
            return match
                .slice(1, 4)
                .map(Number)
                .concat([1]);
        }
    }
    if (rgbaColorRegex.test(color)) {
        var match = color.match(rgbaColorRegex);
        if (match) {
            return match.slice(1, 5).map(Number);
        }
    }
    return undefined;
};
exports.stringifyColor = function (color, target) {
    var _a = color.slice(0, 3).map(Math.round), r = _a[0], g = _a[1], b = _a[2];
    var a = color[3];
    if (hexColorRegex.test(target)) {
        if (a === 1) {
            return "#" + rgb_hex_1.default(r, g, b);
        }
        return "#" + rgb_hex_1.default(r, g, b, a);
    }
    if (rgbColorRegex.test(target) && a === 1) {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
};
