import { parseColor, stringifyColor } from '../utils';

describe('parseColor', () => {
  test('parse hex color', () => {
    expect(parseColor('#ff')).toEqual(undefined);
    expect(parseColor('#fffff')).toEqual(undefined);
    expect(parseColor('#fffffff')).toEqual(undefined);
    expect(parseColor('#ffffffffff')).toEqual(undefined);
    expect(parseColor('#fff')).toEqual([255, 255, 255, 1]);
    expect(parseColor('#ffff')).toEqual([255, 255, 255, 1]);
    expect(parseColor('#fffc')).toEqual([255, 255, 255, 0.8]);
    expect(parseColor('#ffffff')).toEqual([255, 255, 255, 1]);
    expect(parseColor('#ffffffff')).toEqual([255, 255, 255, 1]);
    expect(parseColor('#ffffffcc')).toEqual([255, 255, 255, 0.8]);
  });

  test('parse rgb color', () => {
    expect(parseColor('rgb(255, 255, 255)')).toEqual([255, 255, 255, 1]);
    expect(parseColor('rgb(255,120,255)')).toEqual([255, 120, 255, 1]);
  });

  test('parse rgba color', () => {
    expect(parseColor('rgba(255, 255, 255)')).toEqual(undefined);
    expect(parseColor('rgba(255,255,255, 1)')).toEqual([255, 255, 255, 1]);
    expect(parseColor('rgba(255,255,255, 0.3)')).toEqual([255, 255, 255, 0.3]);
    expect(parseColor('rgba(255,255,255, .3)')).toEqual([255, 255, 255, 0.3]);
  });

  test('parse rgba hex color', () => {
    expect(parseColor('rgba(#FFF)')).toEqual(undefined);
    expect(parseColor('rgba(#FFFFFF, 1)')).toEqual([255, 255, 255, 1]);
    expect(parseColor('rgba(#0FC, 0.7)')).toEqual([0, 255, 204, 0.7]);
    expect(parseColor('rgba(#FFF, 0.3)')).toEqual([255, 255, 255, 0.3]);
    expect(parseColor('rgba(#FFFFFF, .3)')).toEqual([255, 255, 255, 0.3]);
  });
});

describe('stringifyColor', () => {
  test('hex target', () => {
    expect(stringifyColor([255, 255, 255, 1], '#FFF')).toBe('#ffffff');
    expect(stringifyColor([255, 255, 255, 0.8], '#FFF')).toBe('#ffffffcc');
    expect(stringifyColor([120, 120, 120, 0.8], '#FFF')).toBe('#787878cc');
  });

  test('rgb target', () => {
    expect(stringifyColor([255, 255, 255, 1], 'rgb(255 ,255, 255)')).toBe(
      'rgb(255, 255, 255)'
    );
    expect(stringifyColor([255, 255, 255, 0.5], 'rgb(255 ,255, 255)')).toBe(
      'rgba(255, 255, 255, 0.5)'
    );
  });

  test('rgba target', () => {
    expect(stringifyColor([255, 255, 255, 1], 'rgba(255 ,255, 255, 1)')).toBe(
      'rgba(255, 255, 255, 1)'
    );
    expect(stringifyColor([255, 255, 255, 0.5], 'rgba(255 ,255, 255, 1)')).toBe(
      'rgba(255, 255, 255, 0.5)'
    );
  });

  test('unknown target', () => {
    expect(stringifyColor([255, 255, 255, 1], 'blah')).toBe(
      'rgba(255, 255, 255, 1)'
    );
    expect(stringifyColor([255, 255, 255, 0.5], 'blah')).toBe(
      'rgba(255, 255, 255, 0.5)'
    );
  });
});
