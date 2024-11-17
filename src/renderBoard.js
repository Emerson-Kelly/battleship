import Ship from "./ship";
import GameBoardController from "./gameController";
import GameBoard from "./gameBoard.js";

const playerGameBoard = new GameBoard();
renderGrid(playerGameBoard.grid, "player-game-board");

const opponentGameBoard = new GameBoard();
renderGrid(playerGameBoard.grid, "opponent-game-board");


function renderGrid(grid, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear existing grid content
  
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;
  
        // Display content based on cell value
        cellDiv.textContent = cell === null ? "" : cell;
  
        container.appendChild(cellDiv);
      });
    });
  }
  