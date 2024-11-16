import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";

export default class Player {
  constructor(isComputer = false) {
    this.gameBoard = new GameBoard();
    this.isComputer = isComputer;
    this.previousAttacks = []; // Track all attempted coordinates
    this.hitQueue = []; // Queue of adjacent cells to try after a hit
  }

  attack(opponent, coord) {
    console.log(`Attacking ${coord}...`);
    const result = opponent.gameBoard.receiveAttack(coord);

    if (result === true) {
        console.log(`Hit at ${coord}! Enqueuing adjacent cells.`);
        this.enqueueAdjacentCells(coord); // Add adjacent cells to queue on hit
    } else {
        console.log(`Miss at ${coord}.`);
    }

    // Record attack attempt
    this.previousAttacks.push(coord);
    return result;
  }

  // Add adjacent cells to the queue if they haven't been attempted
  enqueueAdjacentCells([x, y]) {
    const adjacentCoords = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    adjacentCoords.forEach((coord) => {
      if (this.isValidCoord(coord) && !this.isPreviouslyAttacked(coord)) {
        this.hitQueue.push(coord);
      }
    });
  }

  // Check if a coordinate is within bounds
  isValidCoord([x, y]) {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }

  // Check if a coordinate hasn't been attacked
  isPreviouslyAttacked(coord) {
    return this.previousAttacks.some(
      (previous) => previous[0] === coord[0] && previous[1] === coord[1]
    );
  }

  generateSmartAttack() {
    // If there are cells in the hit queue, prioritize them
    if (this.hitQueue.length > 0) {
      this.previousAttacks.push(this.hitQueue[0]);
      return this.hitQueue.shift(); // Get the next adjacent cell to attack
    }

    // Fallback to a random attack if no adjacent cells remain
    return this.generateRandomAttack();
  }

  generateRandomAttack() {
    // Prioritize coordinates from hitQueue
    if (this.hitQueue.length > 0) {
      this.previousAttacks.push(this.hitQueue[0]);
      return this.hitQueue.shift();
    }

    // Otherwise, generate random unique coordinates
    let coord;
    do {
      coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } while (
      this.previousAttacks.some(
        (attackedCoord) =>
          attackedCoord[0] === coord[0] && attackedCoord[1] === coord[1]
      )
    );

    this.previousAttacks.push(coord);
    return coord;
  }
}

module.exports = Player;
