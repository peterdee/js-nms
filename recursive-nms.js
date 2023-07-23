// eslint-disable-next-line
import Point from './point.js';
import { set1 } from './datasets.js';

/**
 * Combine clusters if possible
 * @param {Point[]} cluster - current cluster
 * @param {Point[][]} clusters - array of clusters
 * @param {number} radius - point radius
 * @param {string} primary - primary sort field
 * @param {string} secondary - secondary sort field
 * @returns {Point[][]}
 */
function combineClusters(
  cluster = [],
  clusters = [],
  radius = 10,
  primary = 'x',
  secondary = 'y',
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
 * @param {string} primarySortField - primary sort field
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

/**
 * Recursive NMS variant that could be used when working with static entities
 * @param {Point[]} array - array of points
 * @param {number} radius - point radius
 * @param {number | null} prevLength - length of array on a previous iteration
 * @returns {Point[]}
 */
function recursiveNMS(
  array = [],
  radius = 10,
  prevLength = null,
) {
  const clusteredX = nms(
    array,
    radius,
    null,
    [],
    [],
    false,
    'x',
  );
  if (prevLength && clusteredX.length === prevLength) {
    return clusteredX;
  }
  const clusteredY = nms(
    clusteredX,
    radius,
    null,
    [],
    [],
    false,
    'y',
  );
  if (clusteredX.length === clusteredY.length) {
    return clusteredY;
  }
  return recursiveNMS(clusteredY, radius, clusteredY.length);
}
