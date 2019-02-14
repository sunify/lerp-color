import lerpArray from 'lerp-array';
import {
  parseColor,
  stringifyColor,
  getStep,
  rgbaHexColorRegex
} from './utils';
import lerpFunc from './declaration';

export { isColor } from './utils';

const lerpColor: lerpFunc = (...colors: any[]) => {
  if (typeof colors[colors.length - 1] !== 'number') {
    const parsedColors = colors.map(parseColor);

    return (t: number) => {
      const [step, time] = getStep([...parsedColors, t]);
      const start = colors[step];
      const end = colors[step + 1];

      if ((time === 0 || start === end) && !rgbaHexColorRegex.test(start)) {
        return start;
      }

      if (time === 1 && !rgbaHexColorRegex.test(end)) {
        return end;
      }

      const startColor = parsedColors[step];
      const endColor = parsedColors[step + 1];

      if (startColor && endColor) {
        return stringifyColor(lerpArray(startColor, endColor, time), end);
      }

      return undefined;
    };
  } else {
    const [step, time] = getStep(colors);
    const start = colors[step];
    const end = colors[step + 1];

    if ((time === 0 || start === end) && !rgbaHexColorRegex.test(start)) {
      return start;
    }

    if (time === 1 && !rgbaHexColorRegex.test(end)) {
      return end;
    }

    const startColor = parseColor(start);
    const endColor = parseColor(end);

    if (startColor && endColor) {
      return stringifyColor(lerpArray(startColor, endColor, time), end);
    }
  }

  return undefined;
};

export default lerpColor;
