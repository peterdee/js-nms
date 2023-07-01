const numbers = [1, 2, 10, 4, -10, 8, 16, 22, 43, 49, 0, 95, 34, 32, 52, 68, 92].sort(
  (a, b) => a - b,
);

function fnn(array = [], r = 10, prev = null, cluster = [], clusters = [], i = 0) {
  if (array.length === 0) {
    return [...clusters, cluster];
  }
  const [p, ...rest] = array;
  console.log(`new iteration (${i}), current value: ${p}, previous value: ${prev}`);
  if (prev === null) {
    console.log(` > add current value ${p} to cluster (previous is null / iteration ${i})`);
    return fnn(rest, r, p, [p], clusters, i + 1);
  }
  if ((p - prev) < r) {
    console.log(` > add current value ${p} to cluster (condition is true)`);
    cluster.push(p);
    return fnn(rest, r, p, cluster, clusters, i + 1);
  }
  console.log(` > start a new cluster with value ${p}, store cluster [${cluster}]`);
  return fnn(rest, r, p, [p], [...clusters, cluster], i + 1);
}

const result = fnn(numbers, 5);
console.log(result, result.flat().length);
console.log('sorted arr:', numbers, numbers.length);
