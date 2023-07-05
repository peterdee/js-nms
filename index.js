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

const edgeCase = [
  new Point(111, 122, 45), 
  new Point(100, 100, 22), 
  new Point(101, 103, 90),
  new Point(103, 97, 93),
  new Point(105, 100, 50),
  new Point(105, 107, 55),
];

function combineClusters(cluster = [], clusters = [], radius = 10) {
  const [lastCluster = []] = clusters.slice(-1);
  const [firstPoint = null] = cluster;
  if (!firstPoint || lastCluster.length === 0) {
    return [...clusters, cluster];
  }
  let combine = false;
  for (let i = 0; i < lastCluster.length; i += 1) {
    const lastClusterPoint = lastCluster[i];
    for (let j = 0; j < cluster.length; j += 1) {
      const currentClusterPoint = cluster[j];
      if ((currentClusterPoint.x - lastClusterPoint.x) < radius
        && Math.abs(currentClusterPoint.y - lastClusterPoint.y) < radius) {
        combine = true;
        break;
      }
    }
    if (combine) {
      break;
    }
  }
  // for (let i = 0; i < lastCluster.length; i += 1) {
  //   const point = lastCluster[i];
  //   if ((firstPoint.x - point.x) < radius
  //     && Math.abs(firstPoint.y - point.y) < radius) {
  //     combine = true;
  //     break;
  //   }
  // }
  if (!combine) {
    return [...clusters, cluster];
  }
  return [
    ...clusters.slice(0, clusters.length - 2),
    [...lastCluster, ...cluster].sort((a, b) => a.x - b.x || a.y - b.y),
  ];
}

/**
 * Non-max suppression (recursive)
 * @param {Point[]} array - sorted array of points
 * @param {number} radius - point radius
 * @param {Point | null} previous - previous value for comparison
 * @param {Point[]} cluster - current point cluster
 * @param {Point[]} selected - selected points from each cluster (based on intensity)
 * @param {boolean} isSorted - indicates if passed array is sorted
 * @param {Point[][]} clusters
 * @returns {Point[]}
 */
function nms(
  array = [],
  radius = 10,
  previous = null,
  cluster = [],
  selected = [],
  isSorted = false,
  clusters = [],
) {
  if (!isSorted) {
    return nms(
      array.sort((a, b) => a.x - b.x || a.y - b.y),
      radius,
      previous,
      cluster,
      selected,
      true,
      clusters,
    );
  }
  if (array.length === 0) {
    console.log(combineClusters(cluster, clusters, radius));
    return [...selected, cluster.sort((a, b) => b.intensity - a.intensity)[0]];
  }
  const [current, ...rest] = array;
  if (previous === null) {
    return nms(rest, radius, current, [current], selected, true, clusters);
  }
  if ((current.x - previous.x) < radius
    && Math.abs(current.y - previous.y) < radius) {
    cluster.push(current);
    return nms(rest, radius, current, cluster, selected, true, clusters);
  }
  
  if (clusters.length > 0) {
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
      combineClusters(cluster, clusters, radius),
    );
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
    [
      ...clusters,
      cluster,
    ],
  );
}

console.time('nms');
console.log(nms(pointsArray, 5));
console.timeEnd('nms');
