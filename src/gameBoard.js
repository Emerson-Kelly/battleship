import Ship from "./ship.js";
import Player from "./player.js";

export default class GameBoard {
  constructor() {
    this.grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
  }

  placeShip(ship, startCoord, direction) {
    const [startX, startY] = startCoord;
    const shipCoords = [];

    for (let i = 0; i < ship.length; i++) {
      const coord =
        direction === "horizontal"
          ? [startX, startY + i]
          : [startX + i, startY];

      shipCoords.push(coord);
      this.grid[coord[0]][coord[1]] = ship;
    }

    ship.setCoordinates(shipCoords);
  }

  receiveAttack([x, y]) {
    const target = this.grid[x][y];

    if (target instanceof Ship) {
      target.hit();
      this.grid[x][y] = "X"; // Temporarily mark as hit

      // Check if the ship is sunk
      if (target.isSunk()) {
        console.log(`${target.type} has been sunk!`);

        // Change all ship's coordinates to the sunk class
        target.getCoordinates().forEach(([coordX, coordY]) => {
          this.grid[coordX][coordY] = "SUNK";
        });
      }

      return true;
    } else {
      this.grid[x][y] = "O"; // Mark the cell as a miss
      return false;
    }
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
    console.log(
      this.grid
        .map((row) => row.map((cell) => (cell ? "S" : "-")).join(" "))
        .join("\n")
    );
  }
}
