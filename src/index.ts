import lerpArray from 'lerp-array';
import { parseColor, stringifyColor } from './utils';

export { isColor } from './utils';

const lerpColor = (start: string, end: string, t: number) => {
  if (t === 0 || start === end) {
    return start;
  }

  if (t === 1) {
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
