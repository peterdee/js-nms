export default class Point {
  intensity;

  x;

  y;

  constructor(x = 0, y = 0, intensity = 0) {
    this.intensity = intensity;
    this.x = x;
    this.y = y;
  }
}
