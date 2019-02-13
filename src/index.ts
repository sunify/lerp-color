import lerpArray from 'lerp-array';
import {
  parseColor,
  stringifyColor,
  getStep,
  rgbaHexColorRegex
} from './utils';
import lerpFunc from './declaration';

export { isColor } from './utils';

const lerpColor: lerpFunc = (...colors: any[]): string | undefined => {
  const [start, end, time] = getStep(colors);

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

  return undefined;
};

export default lerpColor;
