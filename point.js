export default class Point {
  id;
  intensity;
  x;
  y;
  constructor(x = 0, y = 0, intensity = 0) {
    this.id = `x${x}y${y}`,
    this.intensity = intensity;
    this.x = x;
    this.y = y;
  }
};
