import Ship from "./ship.js";

export default class GameBoard {
  constructor(size = 10) {
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(ship, startCoord, direction) {
    const [startX, startY] = startCoord;
    const length = ship.length;

    const [endX, endY] = this.calculateEndCoordinates(
      startX,
      startY,
      length,
      direction
    );

    if (endX >= this.grid.length || endY >= this.grid[0].length) {
      throw new Error("Ship placement is out of bounds");
    }

    // Check if ship overlaps with existing ships
    for (let i = 0; i < length; i++) {
      const x = direction === "horizontal" ? startX : startX + i;
      const y = direction === "horizontal" ? startY + i : startY;

      if (this.grid[x][y] !== null) {
        throw new Error("Ship placement overlaps with another ship");
      }
    }

    // Place the ship on the grid
    for (let i = 0; i < length; i++) {
      const x = direction === "horizontal" ? startX : startX + i;
      const y = direction === "horizontal" ? startY + i : startY;

      this.grid[x][y] = ship; // Place ship reference in grid
    }

    // Add ship to ships array for tracking
    this.ships.push(ship);
  }

  receiveAttack(coord) {
    const [x, y] = coord;
    const cell = this.grid[x][y];

    if (cell === null) {  // Miss
        this.grid[x][y] = 'O';  // Mark as miss
        this.missedShots.push(coord);
        return false;
    } else if (cell instanceof Ship) {  // Hit on a ship
        cell.hit();  // Increment the ship's hit counter
        this.grid[x][y] = 'X';  // Mark cell as hit
        //this.grid[x][y] = { ship: cell, hit: true };  // Mark cell as hit
        return true;
    }

    return false; // Already attacked or invalid cell
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  calculateEndCoordinates(startX, startY, length, direction) {
    let endX = startX;
    let endY = startY;

    if (direction === "horizontal") {
      endY = startY + length - 1;
    } else if (direction === "vertical") {
      endX = startX + length - 1;
    }

    return [endX, endY];
  }

  printBoard() {
    console.log(this.grid.map(row => row.map(cell => (cell ? "S" : "-")).join(" ")).join("\n"));
  }
}

module.exports = GameBoard;
