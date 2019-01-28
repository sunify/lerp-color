import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';

const hexColorRegex = /^#(?=[0-9a-fA-F]*$)(?:.{3}|.{4}|.{6}|.{8})$/;
const rgbColorRegex = /^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)$/;
const rgbaColorRegex = /^rgba\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?|\.\d+)\)$/;

export const isColor = (c: any) =>
  hexColorRegex.test(String(c)) ||
  rgbColorRegex.test(String(c)) ||
  rgbaColorRegex.test(String(c));

export const parseColor = (color: string) => {
  if (hexColorRegex.test(color)) {
    const [r, g, b, a] = hexRgb(color, { format: 'array' });
    return [r, g, b, a === 255 ? 1 : a];
  }

  if (rgbColorRegex.test(color)) {
    const match = color.match(rgbColorRegex);
    if (match) {
      return match
        .slice(1, 4)
        .map(Number)
        .concat([1]);
    }
  }

  if (rgbaColorRegex.test(color)) {
    const match = color.match(rgbaColorRegex);
    if (match) {
      return match.slice(1, 5).map(Number);
    }
  }

  return undefined;
};

export const stringifyColor = (color: number[], target: string) => {
  const [r, g, b] = color.slice(0, 3).map(Math.round);
  const a = color[3];

  if (hexColorRegex.test(target)) {
    if (a === 1) {
      return `#${rgbHex(r, g, b)}`;
    }

    return `#${rgbHex(r, g, b, a)}`;
  }

  if (rgbColorRegex.test(target) && a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
