"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
describe('parseColor', function () {
    test('parse hex color', function () {
        expect(utils_1.parseColor('#ff')).toEqual(undefined);
        expect(utils_1.parseColor('#fffff')).toEqual(undefined);
        expect(utils_1.parseColor('#fffffff')).toEqual(undefined);
        expect(utils_1.parseColor('#ffffffffff')).toEqual(undefined);
        expect(utils_1.parseColor('#fff')).toEqual([255, 255, 255, 1]);
        expect(utils_1.parseColor('#ffff')).toEqual([255, 255, 255, 1]);
        expect(utils_1.parseColor('#fffc')).toEqual([255, 255, 255, 0.8]);
        expect(utils_1.parseColor('#ffffff')).toEqual([255, 255, 255, 1]);
        expect(utils_1.parseColor('#ffffffff')).toEqual([255, 255, 255, 1]);
        expect(utils_1.parseColor('#ffffffcc')).toEqual([255, 255, 255, 0.8]);
    });
    test('parse rgb color', function () {
        expect(utils_1.parseColor('rgb(255, 255, 255)')).toEqual([255, 255, 255, 1]);
        expect(utils_1.parseColor('rgb(255,120,255)')).toEqual([255, 120, 255, 1]);
    });
    test('parse rgba color', function () {
        expect(utils_1.parseColor('rgba(255, 255, 255)')).toEqual(undefined);
        expect(utils_1.parseColor('rgba(255,255,255, 1)')).toEqual([255, 255, 255, 1]);
        expect(utils_1.parseColor('rgba(255,255,255, 0.3)')).toEqual([255, 255, 255, 0.3]);
        expect(utils_1.parseColor('rgba(255,255,255, .3)')).toEqual([255, 255, 255, 0.3]);
    });
});
describe('stringifyColor', function () {
    test('hex target', function () {
        expect(utils_1.stringifyColor([255, 255, 255, 1], '#FFF')).toBe('#ffffff');
        expect(utils_1.stringifyColor([255, 255, 255, 0.8], '#FFF')).toBe('#ffffffcc');
        expect(utils_1.stringifyColor([120, 120, 120, 0.8], '#FFF')).toBe('#787878cc');
    });
    test('rgb target', function () {
        expect(utils_1.stringifyColor([255, 255, 255, 1], 'rgb(255 ,255, 255)')).toBe('rgb(255, 255, 255)');
        expect(utils_1.stringifyColor([255, 255, 255, 0.5], 'rgb(255 ,255, 255)')).toBe('rgba(255, 255, 255, 0.5)');
    });
    test('rgba target', function () {
        expect(utils_1.stringifyColor([255, 255, 255, 1], 'rgba(255 ,255, 255, 1)')).toBe('rgba(255, 255, 255, 1)');
        expect(utils_1.stringifyColor([255, 255, 255, 0.5], 'rgba(255 ,255, 255, 1)')).toBe('rgba(255, 255, 255, 0.5)');
    });
    test('unknown target', function () {
        expect(utils_1.stringifyColor([255, 255, 255, 1], 'blah')).toBe('rgba(255, 255, 255, 1)');
        expect(utils_1.stringifyColor([255, 255, 255, 0.5], 'blah')).toBe('rgba(255, 255, 255, 0.5)');
    });
});
