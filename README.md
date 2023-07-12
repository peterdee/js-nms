## Non Maximum Suppression with Javascript

An example of Non Maximum Suppression with Javascript (using recursion).

### Input

```javascript
class Point {
  intensity;

  x;
  
  y;
  
  constructor(x = 0, y = 0, intensity = 0) {
    this.intensity = intensity;
    this.x = x;
    this.y = y;
  }
};

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

const radius = 5;

console.log(nms(pointsArray, radius));
```

The goal here is to create clusters of points based on the radius value. Overlapping points are grouped in the same cluster, and then the point with hightest intensity is selected from each cluster.

### Output

```text
// radius = 5
[
  Point { intensity: 99, x: 158, y: 290 },
  Point { intensity: 50, x: 266, y: 432 },
  Point { intensity: 55, x: 269, y: 426 },
  Point { intensity: 95, x: 277, y: 419 },
  Point { intensity: 52, x: 280, y: 450 },
  Point { intensity: 51, x: 285, y: 243 },
  Point { intensity: 92, x: 306, y: 29 },
  Point { intensity: 96, x: 307, y: 20 },
  Point { intensity: 43, x: 418, y: 236 },
  Point { intensity: 46, x: 421, y: 243 }
]

// radius = 15
[
  Point { intensity: 96, x: 307, y: 20 },
  Point { intensity: 51, x: 285, y: 243 },
  Point { intensity: 46, x: 421, y: 243 },
  Point { intensity: 99, x: 158, y: 290 },
  Point { intensity: 95, x: 277, y: 419 },
  Point { intensity: 52, x: 280, y: 450 }
]

// radius = 50
[
  Point { intensity: 96, x: 307, y: 20 },
  Point { intensity: 51, x: 285, y: 243 },
  Point { intensity: 46, x: 421, y: 243 },
  Point { intensity: 99, x: 158, y: 290 },
  Point { intensity: 95, x: 277, y: 419 }
]
```

### Issues

Current implementation is pretty complex because there are some edge cases that should be handled.

The `combineClusters()` function is required to handle an edge case where two clusters could be merged due to overlapping points. The function itself has to compare all of the elements of two clusters (`O(n)^2`) and this has to be done for all of the clusters.

If `combineClusters()` is omitted, there's no guarantee that local maximum points from different clusters will have a `radius` distance between them.

It is still possible to have several points with overlapping radius, this is because selected points were located at the edge of the cluster and had the maximum intensity value.

As a result, current implementation is probably not the quickiest one.

### License

[MIT](LICENSE.md)
