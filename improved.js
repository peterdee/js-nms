const numbers = [1, 2, 10, 4, -10, -9, 8, 16, 22, 43, 49, 0, 34, 32, 52, 68, 92].sort(
  (a, b) => a - b,
);

function fnn(array = [], r = 10, val = array[0] || null, cluster = [], clusters = []) {
  if (array.length === 0 || val === null) {
    return clusters;
  }
  const [p, ...rest] = array;
  console.log(val, p);
  if ((p - val) < r) {
    cluster.push(p);
    console.log('add', p);
  } else {
    console.log('next', rest[rest.indexOf(p) + 1]);
    return fnn(rest, r, rest[rest.indexOf(p) + 1] || null, [p], [...clusters, cluster]);
  }
  return fnn(rest, r, p, cluster, clusters);
}

const result = fnn(numbers, 5);
console.log(result, result.flat().length);
console.log('sorted arr:', numbers, numbers.length);
