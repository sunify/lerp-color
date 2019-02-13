import { parseColor, stringifyColor, getStep } from '../utils';

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

describe('getStep', () => {
  test('2 colors', () => {
    expect(getStep(['#FC0', '#FC0', 0])).toEqual(['#FC0', '#FC0', 0]);
    expect(getStep(['#FC0', '#FC0', 1])).toEqual(['#FC0', '#FC0', 1]);
    expect(getStep(['#FC0', '#FC0', 0.2])).toEqual(['#FC0', '#FC0', 0.2]);
    expect(getStep(['#FC0', '#FC0', 0.35])).toEqual(['#FC0', '#FC0', 0.35]);
  });

  test('3 colors', () => {
    const colors = ['#FFF', '#F00', '#000'];
    expect(getStep([...colors, 0])).toEqual(['#FFF', '#F00', 0]);
    expect(getStep([...colors, 0.25])).toEqual(['#FFF', '#F00', 0.5]);
    expect(getStep([...colors, 0.5])).toEqual(['#F00', '#000', 0]);
    expect(getStep([...colors, 0.75])).toEqual(['#F00', '#000', 0.5]);
    expect(getStep([...colors, 1])).toEqual(['#F00', '#000', 1]);
  });

  test('6 colors', () => {
    const roundTime = ([c1, c2, t]: [string, string, number]) => [
      c1,
      c2,
      Math.round(t * 100) / 100
    ];
    const colors = ['#FFF', '#F00', '#000', '#CF0', '#0FC', '#0CF'];
    expect(getStep([...colors, 0])).toEqual(['#FFF', '#F00', 0]);
    expect(roundTime(getStep([...colors, 0.2]))).toEqual(['#F00', '#000', 0]);
    expect(roundTime(getStep([...colors, 0.25]))).toEqual([
      '#F00',
      '#000',
      0.25
    ]);
    expect(roundTime(getStep([...colors, 0.3]))).toEqual(['#F00', '#000', 0.5]);
    expect(roundTime(getStep([...colors, 0.4]))).toEqual(['#000', '#CF0', 0]);
    expect(roundTime(getStep([...colors, 0.5]))).toEqual(['#000', '#CF0', 0.5]);
    expect(roundTime(getStep([...colors, 0.65]))).toEqual([
      '#CF0',
      '#0FC',
      0.25
    ]);
    expect(roundTime(getStep([...colors, 0.7]))).toEqual(['#CF0', '#0FC', 0.5]);
    expect(roundTime(getStep([...colors, 0.9]))).toEqual(['#0FC', '#0CF', 0.5]);
    expect(roundTime(getStep([...colors, 0.95]))).toEqual([
      '#0FC',
      '#0CF',
      0.75
    ]);
    expect(roundTime(getStep([...colors, 1]))).toEqual(['#0FC', '#0CF', 1]);
  });
});
