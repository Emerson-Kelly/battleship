export default class Ship {
  constructor(length, type = "unknown", orientation = "horizontal") {
    this.length = length;
    this.hits = 0;
    this.type = type;
    this.coordinates = [];
    this.orientation = orientation;
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

  setOrientation(orientation) {
    this.orientation = orientation;
  }

  getOrientation() {
    return this.orientation;
  }
}
