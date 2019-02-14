import lerp from '../index';

describe('plain', () => {
  test('partial', () => {
    const mem = lerp('#000', '#FFF');
    expect(mem(0)).toBe('#000');
    expect(mem(0.5)).toBe('#808080');
    expect(mem(1)).toBe('#FFF');

    const mem2 = lerp('rgba(#000, 1)', 'rgba(#FFF, 0.6)');
    expect(mem2(0)).toBe('rgba(0, 0, 0, 1)');
    expect(mem2(0.5)).toBe('rgba(128, 128, 128, 0.8)');
    expect(mem2(1)).toBe('rgba(255, 255, 255, 0.6)');

    const mem3 = lerp(
      '#FFF',
      'rgba(255, 255, 255, 0.4)',
      'rgb(255, 255, 255,)',
      'rgba(#FFF, 0.5)'
    );
    for (let i = 1; i <= 10; i += 1) {
      expect(mem3(i / 10)).toBe(
        lerp(
          '#FFF',
          'rgba(255, 255, 255, 0.4)',
          'rgb(255, 255, 255,)',
          'rgba(#FFF, 0.5)',
          i / 10
        )
      );
    }
  });

  test('edges', () => {
    expect(lerp('#000', '#FFF', 0)).toBe('#000');
    expect(lerp('#000', '#FFF', 1)).toBe('#FFF');
    expect(lerp('#0000', '#FFFF', 0)).toBe('#0000');
    expect(lerp('#0000', '#FFFF', 1)).toBe('#FFFF');
    expect(lerp('rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)', 0)).toBe(
      'rgba(0, 0, 0, 1)'
    );
    expect(lerp('rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)', 1)).toBe(
      'rgba(255, 255, 255, 1)'
    );
    expect(lerp('rgb(0, 0, 0)', 'rgb(255, 255, 255)', 0)).toBe('rgb(0, 0, 0)');
    expect(lerp('rgb(0, 0, 0)', 'rgb(255, 255, 255)', 1)).toBe(
      'rgb(255, 255, 255)'
    );
    expect(lerp('rgba(#000, 1)', 'rgba(#FFF, 1)', 0)).toBe('rgba(0, 0, 0, 1)');
    expect(lerp('rgba(#000, 1)', 'rgba(#FFF, 1)', 1)).toBe(
      'rgba(255, 255, 255, 1)'
    );
  });

  test('unknown formats', () => {
    expect(lerp('#FFFFF', '#FFF', 0.5)).toBe(undefined);
    expect(lerp('blah', '#FFF', 0.5)).toBe(undefined);
    expect(lerp('rgba(255, 255, 255)', '#FFF', 0.5)).toBe(undefined);
    expect(lerp('rgb(255, 255, 255, 1)', '#FFF', 0.5)).toBe(undefined);
  });
});
