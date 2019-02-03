import lerpArray from 'lerp-array';
import { parseColor, stringifyColor, rgbaHexColorRegex } from './utils';

export { isColor } from './utils';

const lerpColor = (start: string, end: string, t: number) => {
  if ((t === 0 || start === end) && !rgbaHexColorRegex.test(start)) {
    return start;
  }

  if (t === 1 && !rgbaHexColorRegex.test(end)) {
    return end;
  }

  const startColor = parseColor(start);
  const endColor = parseColor(end);

  if (startColor && endColor) {
    return stringifyColor(lerpArray(startColor, endColor, t), end);
  }

  return undefined;
};

export default lerpColor;
