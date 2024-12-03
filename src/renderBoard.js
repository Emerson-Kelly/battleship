import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";
import { opponent } from "./index.js";


export const opponentGameBoard = new GameBoard();
export const playerGameBoard = new GameBoard();

// Create ships with types
export const playerCarrier = new Ship(5, "carrier");
export const playerBattleship = new Ship(4, "battleship");
export const playerDestroyer = new Ship(3, "destroyer");
export const playerSubmarine = new Ship(3, "submarine");
export const playerPatrolBoat = new Ship(2, "patrol-boat");

playerGameBoard.placeShip(playerCarrier, [0, 0], "horizontal");
playerGameBoard.placeShip(playerBattleship, [3, 3], "vertical");
playerGameBoard.placeShip(playerDestroyer, [4, 1], "vertical");
playerGameBoard.placeShip(playerSubmarine, [6, 6], "horizontal");
playerGameBoard.placeShip(playerPatrolBoat, [8, 6], "vertical");

export const opponentCarrier = new Ship(5, "carrier");
export const opponentBattleship = new Ship(4, "battleship");
export const opponentDestroyer = new Ship(3, "destroyer");
export const opponentSubmarine = new Ship(3, "submarine");
export const opponentPatrolBoat = new Ship(2, "patrol-boat");

// Place ships on the game boards
opponentGameBoard.placeShip(opponentCarrier, [0, 0], "horizontal");
opponentGameBoard.placeShip(opponentBattleship, [3, 3], "vertical");
opponentGameBoard.placeShip(opponentDestroyer, [4, 1], "vertical");
opponentGameBoard.placeShip(opponentSubmarine, [6, 6], "horizontal");
opponentGameBoard.placeShip(opponentPatrolBoat, [8, 6], "vertical");


/*opponentGameBoard.receiveAttack([3, 3]);
opponentGameBoard.receiveAttack([4, 3]);
opponentGameBoard.receiveAttack([5, 3]);
opponentGameBoard.receiveAttack([6, 3]);
console.log(opponentBattleship.getCoordinates());
*/


/*
playerGameBoard.receiveAttack([1, 1]);
playerGameBoard.receiveAttack([2, 1]);
playerGameBoard.receiveAttack([3, 1]);
*/

// Function to render the player's or opponent's game board
 export default function renderGameBoard(gameBoard, boardElement) {
  // Clear the board first
  boardElement.innerHTML = "";

  // Loop through each cell in the grid and render the corresponding state
  gameBoard.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.setAttribute('data-x', rowIndex);
      cellElement.setAttribute('data-y', colIndex);

      if (cell === "SUNK") {
        console.log("SUNK");
        cellElement.classList.add("sunk");
      }
      if (cell instanceof Ship) {
        // Apply the ship type class (e.g., 'carrier', 'battleship', etc.)
        cellElement.classList.add(cell.type);

        cellElement.classList.add("ship");
      } else if (cell === "X") {
        console.log("hit");
        //player.attack(cell);
        cellElement.classList.add("hit");
      } else if (cell === "O") {
        cellElement.classList.add("miss");
      } 

      // Append the cell to the board
      boardElement.appendChild(cellElement);
    });
  });
  
}

// Render the game boards
renderGameBoard(playerGameBoard, document.getElementById("player-game-board"));
renderGameBoard(
  opponentGameBoard,
  document.getElementById("opponent-game-board")
);
