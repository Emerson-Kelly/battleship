import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";
import { opponent } from "./index.js";
import playerBoardPlacement from "./playerBoardPlacement.js";

import carrierIcon from "./assets/ships/carrierIcon.svg";
import battleshipIcon from "./assets/ships/battleshipIcon.svg";
import destroyerIcon from "./assets/ships/destroyerIcon.svg";
import submarineIcon from "./assets/ships/submarineIcon.svg";
import patrolIcon from "./assets/ships/patrolIcon.svg";

import computerBoardPlacement from "./computerBoardPlacement.js";


export const opponentGameBoard = new GameBoard();
export const playerGameBoard = new GameBoard();
/*
// Create ships with types
// Player Ships
export const playerCarrier = new Ship(5, "carrier");
export const playerBattleship = new Ship(4, "battleship");
export const playerDestroyer = new Ship(3, "destroyer");
export const playerSubmarine = new Ship(3, "submarine");
export const playerPatrolBoat = new Ship(2, "patrol-boat");

// Place player ships
playerGameBoard.placeShip(playerCarrier, [2, 0], "horizontal");
playerGameBoard.placeShip(playerBattleship, [5, 5], "vertical");
playerGameBoard.placeShip(playerDestroyer, [7, 2], "horizontal");
playerGameBoard.placeShip(playerSubmarine, [0, 8], "vertical");
playerGameBoard.placeShip(playerPatrolBoat, [3, 6], "horizontal");



// Opponent Ships
export const opponentCarrier = new Ship(5, "carrier");
export const opponentBattleship = new Ship(4, "battleship");
export const opponentDestroyer = new Ship(3, "destroyer");
export const opponentSubmarine = new Ship(3, "submarine");
export const opponentPatrolBoat = new Ship(2, "patrol-boat");

// Place opponent ships
opponentGameBoard.placeShip(opponentCarrier, [0, 1], "vertical");
opponentGameBoard.placeShip(opponentBattleship, [5, 0], "horizontal");
opponentGameBoard.placeShip(opponentDestroyer, [6, 4], "vertical");
opponentGameBoard.placeShip(opponentSubmarine, [8, 7], "horizontal");
opponentGameBoard.placeShip(opponentPatrolBoat, [0, 4], "vertical");
*/
playerBoardPlacement(playerGameBoard);
computerBoardPlacement(opponentGameBoard);


// Function to render the player's or opponent's game board
export default function renderGameBoard(gameBoard, boardElement) {
  // Clear the board first
  boardElement.innerHTML = "";

  // Loop through each cell in the grid and render the corresponding state
  gameBoard.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.setAttribute("data-x", rowIndex);
      cellElement.setAttribute("data-y", colIndex);

      if (cell === "SUNK") {
        cellElement.classList.add("sunk");
      } else if (cell instanceof Ship) {
        // Check if this cell is the first cell of the ship
        const isFirstCell =
          cell.getCoordinates()[0][0] === rowIndex &&
          cell.getCoordinates()[0][1] === colIndex;

          if (isFirstCell) {
            const shipContainer = document.createElement("div");
            shipContainer.classList.add("ship-container", cell.getOrientation());
            shipContainer.style.setProperty("--ship-length", cell.length);
          
            if (cell.getOrientation() === "horizontal") {
              shipContainer.style.gridColumnStart = colIndex + 1;
              shipContainer.style.gridColumnEnd = colIndex + 1 + cell.length;
              shipContainer.style.gridRowStart = rowIndex + 1;
            } else {
              shipContainer.style.transform = 'rotate(90deg)';
              shipContainer.style.width = cell.length * 48 + 'px';
              shipContainer.style.transformOrigin = 'top left';
              shipContainer.style.gridRowStart = rowIndex + 1;
              shipContainer.style.gridRowEnd = rowIndex + 1 + cell.length;
              shipContainer.style.gridColumnStart = colIndex + 2;
            }
          
            const shipImage = document.createElement("img");
            shipImage.src = getShipIcon(cell.type);
            shipImage.alt = `${cell.type}`;
            shipImage.classList.add("ship-svg");
            shipContainer.appendChild(shipImage);
          
            boardElement.appendChild(shipContainer);
          }
          
      } else if (cell === "X") {
        cellElement.classList.add("hit");
      } else if (cell === "O") {
        cellElement.classList.add("miss");
      }

      // Append the cell to the board
      boardElement.appendChild(cellElement);
    });
  });
}


function getShipIcon(type) {
  switch (type) {
    case "carrier": return carrierIcon;
    case "battleship": return battleshipIcon;
    case "destroyer": return destroyerIcon;
    case "submarine": return submarineIcon;
    case "patrol-boat": return patrolIcon;
    default: return "";
  }
}

// Render the game boards
renderGameBoard(playerGameBoard, document.getElementById("player-game-board"));
renderGameBoard(
  opponentGameBoard,
  document.getElementById("opponent-game-board")
);
