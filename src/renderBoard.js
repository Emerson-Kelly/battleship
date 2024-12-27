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

playerBoardPlacement(playerGameBoard);
computerBoardPlacement(opponentGameBoard);

// Function to render the player's or opponent's game board
export default function renderGameBoard(gameBoard, boardElement) {
  boardElement.innerHTML = "";

  gameBoard.ships.forEach(ship => {
    const [startX, startY] = ship.getCoordinates()[0];
    const shipContainer = document.createElement("div");
    const shipImage = document.createElement("img");
    
    shipContainer.classList.add("ship-container", ship.getOrientation());
    shipContainer.style.setProperty("--ship-length", ship.length);

    if (ship.getOrientation() === "horizontal") {
      shipContainer.style.gridColumnStart = startY + 1;
      shipContainer.style.gridColumnEnd = startY + 1 + ship.length;
      shipContainer.style.gridRowStart = startX + 1;
    } else {
      shipContainer.style.transform = "rotate(90deg)";
      shipContainer.style.width = ship.length * 48 + "px";
      shipContainer.style.transformOrigin = "top left";
      shipContainer.style.gridRowStart = startX + 1;
      shipContainer.style.gridRowEnd = startX + 1 + ship.length;
      shipContainer.style.gridColumnStart = startY + 2;
    }

    shipImage.src = getShipIcon(ship.type);
    shipImage.alt = `${ship.type}`;
    shipImage.classList.add("ship-svg");
  
    shipContainer.appendChild(shipImage);
    boardElement.appendChild(shipContainer);
  });

  gameBoard.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.setAttribute("data-x", rowIndex);
      cellElement.setAttribute("data-y", colIndex);

      // Add hit or miss indicators
      if (cell === "SUNK" || cell === "X") {
        cellElement.classList.add("hit");
      } else if (cell === "O") {
        cellElement.classList.add("miss");
      }
    
      boardElement.appendChild(cellElement);
    });
  });
}


function getShipIcon(type) {
  switch (type) {
    case "carrier":
      return carrierIcon;
    case "battleship":
      return battleshipIcon;
    case "destroyer":
      return destroyerIcon;
    case "submarine":
      return submarineIcon;
    case "patrol-boat":
      return patrolIcon;
    default:
      return "";
  }
}

// Render the game boards
renderGameBoard(playerGameBoard, document.getElementById("player-game-board"));
renderGameBoard(
  opponentGameBoard,
  document.getElementById("opponent-game-board")
);
