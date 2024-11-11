import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";

export default class Player {
  constructor(isComputer = false) {
    this.gameBoard = new GameBoard();
    this.isComputer = isComputer;
    this.previousAttacks = []; // Track all attempted coordinates
  }

  attack(opponent, coord) {
    return opponent.gameBoard.receiveAttack(coord);
  }

  generateRandomAttack() {
    let coord;
    do {
      coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } while (
      this.previousAttacks.some(
        (previous) => previous[0] === coord[0] && previous[1] === coord[1]
      )
    );
    this.previousAttacks.push(coord); // Store the unique coordinate
    return coord;
  }
}

module.exports = Player;
