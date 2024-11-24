import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";

const opponentGameBoard = new GameBoard();
const playerGameBoard = new GameBoard();

// Create ships with types
const playerCarrier = new Ship(5, "carrier");
const playerBattleship = new Ship(4, "battleship");
const playerDestroyer = new Ship(3, "destroyer");
const playerSubmarine = new Ship(3, "submarine");
const playerPatrolBoat = new Ship(2, "patrol-boat");

const opponentCarrier = new Ship(5, "carrier");
const opponentBattleship = new Ship(4, "battleship");
const opponentDestroyer = new Ship(3, "destroyer");
const opponentSubmarine = new Ship(3, "submarine");
const opponentPatrolBoat = new Ship(2, "patrol-boat");

// Place ships on the game boards
opponentGameBoard.placeShip(opponentCarrier, [0, 0], "horizontal");
opponentGameBoard.placeShip(opponentBattleship, [3, 3], "vertical");
opponentGameBoard.placeShip(opponentSubmarine, [6, 6], "horizontal");

opponentGameBoard.receiveAttack([3, 3]);
opponentGameBoard.receiveAttack([4, 3]);
opponentGameBoard.receiveAttack([5, 3]);
opponentGameBoard.receiveAttack([6, 3]);
console.log(opponentBattleship.getCoordinates());

playerGameBoard.placeShip(playerSubmarine, [1, 1], "vertical");
playerGameBoard.placeShip(playerPatrolBoat, [2, 2], "horizontal");

playerGameBoard.receiveAttack([1, 1]);
playerGameBoard.receiveAttack([2, 1]);
playerGameBoard.receiveAttack([3, 1]);

// Function to render the player's or opponent's game board
function renderGameBoard(gameBoard, boardElement) {
  // Clear the board first
  boardElement.innerHTML = "";

  // Loop through each cell in the grid and render the corresponding state
  gameBoard.grid.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

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