import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";
import Player from "./player.js";
import { renderGameBoard } from "./renderBoard.js";
import renderUIAttack from "./renderUIAttack.js";

export default class GameBoardController {
  constructor() {
    this.player = new Player();
    this.computer = new Player(true);
    this.currentPlayer = this.player;
  }

  initializeGame() {
    this.player = new Player();
    this.computer = new Player(true);

    const playerShip = new Ship(3);
    const computerShip = new Ship(4);

    this.player.gameBoard.placeShip(playerShip, [0, 0], "vertical");
    this.computer.gameBoard.placeShip(computerShip, [3, 3], "horizontal");

    this.currentPlayer = this.player;
    renderUIAttack();
  }

  startGame() {
    while (!this.checkGameOver()) {
      const coord = this.currentPlayer.isComputer
        ? this.computer.generateRandomAttack()
        : this.getPlayerInput();
      this.takeTurn(coord);
      this.switchTurns();
    }
  }

  takeTurn(coord) {
    // Attack the opponent at the specified coordinates
    const opponent = this.getOpponent();

    console.log(`Attacking ${coord} on opponent's grid...`);
    console.log("Opponent's current grid:");
    this.logResult(opponent.gameBoard.grid); // Log opponent's grid before attack

    const result = this.currentPlayer.attack(opponent, coord);

    // Log the outcome of the attack
    console.log(result ? `Hit at ${coord}!` : `Miss at ${coord}.`);

    console.log("Opponent's grid after attack:");
    this.logResult(opponent.gameBoard.grid); // Log opponent's grid after attack

    // log boards after each attack for debugging
    if (result) {
      console.log("Player's board:");
      this.logResult(this.player.gameBoard.grid);
      console.log("Computer's board:");
      this.logResult(this.computer.gameBoard.grid);
    }

    // Switch turns to the other player
    this.switchTurns();
  }

  checkGameOver() {
    return (
      this.player.gameBoard.allShipsSunk() ||
      this.computer.gameBoard.allShipsSunk()
    );
  }

  switchTurns() {
    this.currentPlayer =
      this.currentPlayer === this.player ? this.computer : this.player;
      if (this.currentPlayer === this.player) {
        renderUIAttack();
      }
  }

  getOpponent() {
    return this.currentPlayer === this.player ? this.computer : this.player;
  }

  logResult(grid) {
    const formattedGrid = grid.map((row) =>
      row.map((cell) => {
        if (cell === null) return "~"; // Empty water
        if (cell === "O") return "O"; // Missed shot
        if (cell === "X") return "X"; // Hit on a ship
        if (cell === "SUNK") return "SUNK"; // Marked as sunk
        if (cell instanceof Ship) return "S"; // Ship part (ship object)
        return cell;
      })
    );

    console.table(formattedGrid);
  }
}
