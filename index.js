import Point from './point.js';

/**
 * Non-max suppression (recursive)
 * @param {number} radius - point radius for NMS
 * @param {Point[]} initial - inital points array
 * @param {Point[]} result - resulting points array
 * @returns {Point[]}
 */
function nmsr(radius = 0, initial = [], result = []) {
  if (initial.length === 0) {
    return result;
  }
  const [point, ...rest] = initial;
  const cluster = [point];
  const leftovers = [];
  rest.forEach((element) => {
    if (Math.abs(element.x - point.x) < radius
      && Math.abs(element.y - point.y) < radius) {
      cluster.push(element);
    } else {
      leftovers.push(element);
    }
  });
  if (cluster.length === 1) {
    result.push(cluster[0]);
  } else {
    result.push(cluster.sort((a, b) => b.intensity - a.intensity)[0]);
  }
  return nmsr(radius, leftovers, result);
}

const pointsArray = [
  new Point(265, 431, 26),
  new Point(285, 243, 51),
  new Point(302, 15, 27),
  new Point(305, 17, 64),
  new Point(418, 236, 43),
  new Point(306, 20, 96), 
  new Point(307, 20, 96),
  new Point(308, 23, 42),
  new Point(421, 243, 46),
  new Point(266, 432, 50),
  new Point(280, 450, 52),
];

const result = nmsr(10, pointsArray);

console.log(result);
