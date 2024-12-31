import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";
import Player from "./player.js";
import { renderGameBoard } from "./renderBoard.js";
import renderUIAttack from "./renderUIAttack.js";
import playerBoardPlacement from "./playerBoardPlacement.js";

export default class GameBoardController {
  constructor() {
    this.player = new Player();
    this.computer = new Player(true);
    this.currentPlayer = this.player;
  }

  initializeGame() {

  
    this.currentPlayer = this.player;

    renderUIAttack();

  }

  startGame() {
    while (!this.checkGameOver()) {
      const coord = this.currentPlayer.isComputer
        ? this.computer.generateRandomAttack()
        : this.getPlayerInput();
      this.takeTurn(coord);
      //this.switchTurns();
      
    }
  }

  takeTurn(coord) {
    
    const opponent = this.getOpponent();
    console.log(`Attacking ${coord} on opponent's grid...`);
  
    console.log("Opponent's current grid:");
    this.logResult(opponent.gameBoard.grid);
  
    const result = opponent.attack(opponent, coord); // Call the updated attack method
    console.log('RESULT: ' + result);
    console.log(result ? `Hit at ${coord}!` : `Miss at ${coord}.`);
  
    console.log("Opponent's grid after attack:");
    this.logResult(opponent.gameBoard.grid);
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
        //renderUIAttack();
  }

  getOpponent() {
    return this.currentPlayer === this.player ? this.computer : this.player;
  }

  logResult(grid) {
    const formattedGrid = grid.map((row) =>
      row.map((cell) => {
        if (cell === null) return "~"; // Empty water
        if (cell === "X") return "X"; // Hit on a ship
        if (cell === "O") return "O"; // Missed shot
        if (cell === "SUNK") return "SUNK"; // Marked as sunk
        if (cell instanceof Ship) return "S"; // Ship part (ship object)
        return cell;
      })
    );

    console.table(formattedGrid);
  }
}
