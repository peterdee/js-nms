import Point from './point.js';
import { set2 } from './datasets.js';

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
  new Point(158, 290, 99),
  new Point(269, 426, 55),
  new Point(277, 419, 95),
  new Point(280, 450, 52),
];

/**
 * Combine clusters if possible
 * @param {Point[]} cluster - current cluster
 * @param {Point[][]} clusters - array of clusters
 * @param {number} radius - point radius
 * @returns {Point[][]}
 */
function combineClusters(
  cluster = [],
  clusters = [],
  radius = 10,
  primary = 'x',
  secondary = 'y'
) {
  const [lastCluster = []] = clusters.slice(-1);
  let combine = false;
  for (let i = 0; i < lastCluster.length; i += 1) {
    const lastClusterPoint = lastCluster[i];
    for (let j = 0; j < cluster.length; j += 1) {
      const currentClusterPoint = cluster[j];
      if ((currentClusterPoint[primary] - lastClusterPoint[primary]) < radius
        && Math.abs(currentClusterPoint[secondary] - lastClusterPoint[secondary]) < radius) {
        combine = true;
        break;
      }
    }
    if (combine) {
      break;
    }
  }
  return !combine
    ? [...clusters, cluster]
    : [
      ...clusters.slice(0, clusters.length - 2),
      [...lastCluster, ...cluster].sort(
        (a, b) => a[primary] - b[primary] || a[secondary] - b[secondary],
      ),
    ];
}

/**
 * Non-max suppression (recursive)
 * @param {Point[]} array - sorted array of points
 * @param {number} radius - point radius
 * @param {Point | null} previous - previous value for comparison
 * @param {Point[]} cluster - current point cluster
 * @param {Point[][]} clusters - array of clusters
 * @param {boolean} isSorted - indicates if passed array is sorted
 * @returns {Point[]}
 */
function nms(
  array = [],
  radius = 10,
  previous = null,
  cluster = [],
  clusters = [],
  isSorted = false,
  primarySortField = 'x',
) {
  const primary = primarySortField === 'x' ? 'x' : 'y';
  const secondary = primarySortField !== 'x' ? 'x' : 'y';
  if (!isSorted && array.length > 0) {
    return nms(
      array.sort((a, b) => a[primary] - b[primary] || a[secondary] - b[secondary]),
      radius,
      previous,
      cluster,
      clusters,
      true,
      primarySortField,
    );
  }
  if (array.length === 0) {
    return combineClusters(cluster, clusters, radius, primary, secondary).map(
      (element) => element.sort((a, b) => b.intensity - a.intensity)[0],
    );
  }
  const [current, ...rest] = array;
  if (previous === null) {
    return nms(rest, radius, current, [current], clusters, true, primarySortField);
  }
  if ((current[primary] - previous[primary]) < radius
    && Math.abs(current[secondary] - previous[secondary]) < radius) {
    cluster.push(current);
    return nms(rest, radius, current, cluster, clusters, true, primarySortField);
  }
  if (clusters.length > 0) {
    return nms(
      rest,
      radius,
      current,
      [current],
      combineClusters(cluster, clusters, radius, primary, secondary),
      true,
      primarySortField,
    );
  }
  clusters.push(cluster);
  return nms(
    rest,
    radius,
    current,
    [current],
    clusters,
    true,
    primarySortField,
  );
}

console.time('nms');
const radius = 15;
const result = nms(
  nms(
    set2,
    radius,
    null,
    [],
    [],
    false,
    'x',
  ),
  radius,
  null,
  [],
  [],
  false,
  'y',
);

console.log(result, result.length, set2.length);
console.timeEnd('nms');
