import Ship from "./ship.js";
import Player from "./player.js";

import shotSoundFile from "./assets/audio/shot-sound.mp3";
import hitSoundFile from "./assets/audio/hit-sound.mp3";
import missSoundFile from "./assets/audio/miss-sound.mp3";

export default class GameBoard {
  constructor() {
    this.grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill("~"));
    this.ships = [];
    this.shotSound = new Audio(shotSoundFile);
    this.hitSound = new Audio(hitSoundFile);
    this.missSound = new Audio(missSoundFile);
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
    ship.setOrientation(direction);
    this.ships.push(ship);
  }

  receiveAttack(coords) {
    this.shotSound.play().catch((error) => console.error("Error playing hit sound:", error));
    // Ensure coords is an array with two elements
    if (!Array.isArray(coords) || coords.length !== 2) {
      console.error("Invalid attack coordinate:", coords);
      return false; // Return false if coords are invalid
    }

    const [y, x] = coords;

    const cell = this.grid[y][x];

   if (cell instanceof Ship) {
      // Hit
      cell.hit([y, x]); // Mark hit on the ship
      console.log(cell);
     
      //console.log(cell.hit(coords));
      this.grid[y][x] = "X"; // Update grid to reflect the hit

        // Play hit sound
        setTimeout(() => {
          this.hitSound.play().catch((error) => console.error("Error playing hit sound:", error));
        }, 1000);

      // Check if the ship is sunk
      if (cell.isSunk()) {
        console.log(`${cell.type} has been sunk!`);

        // Change all ship's coordinates to the sunk class
        cell.getCoordinates().forEach(([coordX, coordY]) => {
          this.grid[coordX][coordY] = "SUNK";
        });
      }
  
      return true; // Indicate hit
    }
    else if (cell === "~") {
      // Miss
      this.grid[y][x] = "O";
      setTimeout(() => {
        this.missSound.play().catch((error) => console.error("Error playing miss sound:", error));
      }, 1000);
   
      return false; // Indicate miss
    } 
 
    // If the cell is already marked as "O" or "X", it's been attacked before.
    return null; // Prevent re-attacks
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

  getShipAt([y, x]) {
    const cell = this.grid[y][x];
    return cell instanceof Ship ? cell : null; // Return the ship instance or null
  }
  
}
