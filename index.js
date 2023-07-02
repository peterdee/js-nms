import Point from './point.js';

const pointsArray = [
  new Point(265, 431, 26),
  new Point(285, 243, 51),
  new Point(302, 15, 27),
  new Point(305, 17, 64),
  new Point(418, 236, 43),
  new Point(306, 29, 92), 
  new Point(307, 20, 96),
  new Point(308, 23, 42),
  new Point(308, 24, 20),
  new Point(421, 243, 46),
  new Point(266, 432, 50),
  new Point(269, 426, 55),
  new Point(277, 419, 95),
  new Point(280, 450, 52),
];

/**
 * Non-max suppression (recursive)
 * @param {Point[]} array - sorted array of points
 * @param {number} radius - point radius
 * @param {Point | null} previous - previous value for comparison
 * @param {Point[]} cluster - current point cluster
 * @param {Point[]} selected - selected points from each cluster (based on intensity)
 * @param {boolean} isSorted - indicates if passed array is sorted
 * @returns {Point[]}
 */
function nms(
  array = [],
  radius = 10,
  previous = null,
  cluster = [],
  selected = [],
  isSorted = false,
) {
  if (!isSorted) {
    return nms(
      array.sort((a, b) => a.x - b.x || a.y - b.y),
      radius,
      previous,
      cluster,
      selected,
      true,
    );
  }
  if (array.length === 0) {
    return [...selected, cluster.sort((a, b) => b.intensity - a.intensity)[0]];
  }
  const [current, ...rest] = array;
  if (previous === null) {
    return nms(rest, radius, current, [current], selected, true);
  }
  if ((current.x - previous.x) < radius
    && Math.abs(current.y - previous.y) < radius) {
    cluster.push(current);
    return nms(rest, radius, current, cluster, selected, true);
  }
  return nms(
    rest,
    radius,
    current,
    [current],
    [
      ...selected,
      cluster.sort((a, b) => b.intensity - a.intensity)[0],
    ],
    true,
  );
}

console.log(nms(pointsArray, 50));
