## Non Maximum Suppression with Javascript

This is an example of NMS implementation with Javascript using recursion.

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
  new Point(269, 426, 55),
  new Point(277, 419, 95),
  new Point(280, 450, 52),
];

const radius = 5;

console.log(nms(pointsArray, radius));
```

The goal here is to group all of the points based on the radius value. Overlapping points are grouped in the same cluster, and then the point with hightest intensity is selected from each cluster.

### Output

```text
// radius = 5
[
  Point { intensity: 50, x: 266, y: 432 },
  Point { intensity: 55, x: 269, y: 426 },
  Point { intensity: 95, x: 277, y: 419 },
  Point { intensity: 52, x: 280, y: 450 },
  Point { intensity: 51, x: 285, y: 243 },
  Point { intensity: 64, x: 305, y: 17 },
  Point { intensity: 92, x: 306, y: 29 },
  Point { intensity: 96, x: 307, y: 20 },
  Point { intensity: 43, x: 418, y: 236 },
  Point { intensity: 46, x: 421, y: 243 }
]

// radius = 10
[
  Point { intensity: 95, x: 277, y: 419 },
  Point { intensity: 52, x: 280, y: 450 },
  Point { intensity: 51, x: 285, y: 243 },
  Point { intensity: 64, x: 305, y: 17 },
  Point { intensity: 96, x: 307, y: 20 },
  Point { intensity: 46, x: 421, y: 243 }
]

// radius = 50
[
  Point { intensity: 95, x: 277, y: 419 },
  Point { intensity: 51, x: 285, y: 243 },
  Point { intensity: 96, x: 307, y: 20 },
  Point { intensity: 46, x: 421, y: 243 }
]
```

### License

[MIT](LICENSE.md)
