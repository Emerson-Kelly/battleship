export default class Ship {
  constructor(length, type = "unknown") {
    this.length = length;
    this.hits = 0;
    this.type = type;
    this.coordinates = [];
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }

  setCoordinates(coords) {
    this.coordinates = coords;
  }

  getCoordinates() {
    return this.coordinates;
  }
}
