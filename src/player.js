import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";
import { opponent } from "./index.js";
//import { opponent } from "./index.js";


export default class Player {
  constructor(isComputer = false) {
    this.gameBoard = new GameBoard();
    this.isComputer = isComputer;
    this.previousAttacks = []; // Track all attempted coordinates
    this.previousHits = []; // Store confirmed hits
    this.hitQueue = []; // Queue of adjacent cells to try after a hit
  }

  attack(target, coord) {
    console.log(`Attacking ${coord}...`);
  
    // Ensure coord is valid
    if (!Array.isArray(coord) || coord.length !== 2) {
      console.error("Invalid coordinate:", coord);
      return false; // Exit early with a miss-like result
    }
  
    // Record attack attempt
    this.previousAttacks.push(coord);
  
    console.log(`HitQueue: ${JSON.stringify(this.hitQueue)}`);
  
    // Refine hit queue if there are at least two hits
    if (this.previousHits.length >= 2) {
     
      this.refineHitQueueBasedOnAxis(this.previousHits);
    }
  
  }
  
  
  

 // Add adjacent cells to the queue if they haven't been attempted
 enqueueAdjacentCells([x, y]) {
  console.log(`Enqueueing adjacent cells for hit at [${x}, ${y}]`);
  
  let adjacentCoords = [
    [x + 1, y], // Down
    [x - 1, y], // Up
    [x, y + 1], // Right
    [x, y - 1], // Left
  ];

  // Only enqueue valid and unattempted cells
  adjacentCoords.forEach((coord) => {
    if (this.isValidCoord(coord) && !this.isPreviouslyAttacked(coord)) {
      this.hitQueue.push(coord);
    }
  });

  // Log the hitQueue before refining
  console.log("HitQueue before refining:", this.hitQueue);
  


  this.previousHits.push([x, y]);
  
  // Refine based on axis if possible
  if (this.previousHits.length >= 2) {
    console.log("Previous Hits (before refining):", this.previousHits);
    this.refineHitQueueBasedOnAxis(this.previousHits);
  } 

  else {
    console.log("Not enough hits to refine the queue.");
  }

  // Log the updated hitQueue
  console.log("Updated hitQueue after refining:", this.hitQueue);
}

// Refine the hit queue based on the axis of the last two hits (horizontal or vertical)
refineHitQueueBasedOnAxis(hits) {
  if (hits.length < 2) return; // Not enough hits to determine an axis

  const [firstHit, secondHit] = hits.slice(-2); // Last two hits
  const sameX = firstHit[1] === secondHit[1]; // Vertical alignment
  const sameY = firstHit[0] === secondHit[0]; // Horizontal alignment

  console.log(`Refining hit queue based on hits: ${hits}`);
  console.log(`Alignment detected: ${sameX ? "Vertical" : sameY ? "Horizontal" : "None"}`);

  if (sameX) {
    // Vertical alignment
    this.hitQueue = this.hitQueue.filter(
      ([x, y]) => y === firstHit[1] && this.isValidCoord([x, y]) && !this.isPreviouslyAttacked([x, y])
    );
  } else if (sameY) {
    // Horizontal alignment
    this.hitQueue = this.hitQueue.filter(
      ([x, y]) => x === firstHit[0] && this.isValidCoord([x, y]) && !this.isPreviouslyAttacked([x, y])
    );
  }

  console.log("Refined hitQueue:", this.hitQueue);
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
      const nextTarget = this.hitQueue.shift();
      this.previousAttacks.push(nextTarget);
      return nextTarget;
    }
    // Otherwise, fallback to a random attack
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
