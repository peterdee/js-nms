// eslint-disable-next-line
import Point from './point.js';

/**
 * Select points based on intensity value
 * @param {Point[]} array - array of points
 * @param {number} radius - NMS radius
 * @param {string} primary - primary sorting field
 * @param {string} secondary - secondary sorting field
 * @returns {Point[]}
 */
function selectPoints(
  array = [],
  radius = 15,
  primary = 'x',
  secondary = 'y',
) {
  let i = 0;
  const result = [];
  for (; i < array.length;) {
    if (i >= array.length) {
      break;
    }
    const current = array[i];
    if (result.length === 0) {
      result.push(current);
      i += 1;
      continue;
    }
    const lastResultIndex = result.length - 1;
    const previous = result[lastResultIndex];
    if ((current[primary] - previous[primary]) < radius
      && Math.abs(current[secondary] - previous[secondary]) < radius) {
      if (current.intensitySum > previous.intensitySum) {
        result[lastResultIndex] = current;
        i += 1;
        continue;
      } else {
        i += 1;
        continue;
      }
    } else {
      result.push(current);
      i += 1;
    }
  }
  return result;
}

/**
 * NMS variant used in FAST corner detector
 * @param {Point[]} array - array of points
 * @param {number} radius - NMS radius
 * @returns {Point[]}
 */
export default function fastNMS(
  array = [],
  radius = 15,
) {
  if (array.length <= 1) {
    return array;
  }
  const sortedX = array.sort((a, b) => a.x - b.x || a.y - b.y);
  const sortedY = selectPoints(sortedX, radius).sort((a, b) => a.y - b.y || a.x - b.x);
  return selectPoints(sortedY, radius, 'y', 'x');
}
