import renderGameBoard from "./renderBoard.js";
import GameBoard from "./gameBoard";
import { opponentGameBoard } from "./renderBoard.js";
import { playerGameBoard } from "./renderBoard.js";
import GameBoardController from "./gameController";
import { gameController } from "./index.js";
import Player from "./player.js";
import { player, opponent } from "./index.js";

const opponentBoardElement = document.getElementById("opponent-game-board");
const playerBoardElement = document.getElementById("player-game-board");



export default function renderUIAttack() {
  const opponentCells = opponentBoardElement.querySelectorAll(".cell"); // Select cells only in the opponent board

  opponentCells.forEach((cell) => {
    // Add hover effect for each opponent cell
    cell.addEventListener("mouseover", () => {
      cell.classList.add("cell:hover"); // Add hover class
    });

    if (!opponentBoardElement) {
      cell.addEventListener("mouseout", () => {
        cell.classList.remove("cell:hover"); // Remove hover class
      });
    }

    // Add click event
    cell.addEventListener("click", () => {
      const x = parseInt(cell.getAttribute("data-x"), 10);
      const y = parseInt(cell.getAttribute("data-y"), 10);

      console.log(`Player attacks cell (${x}, ${y}) on opponent's board.`);

      //player.attack(opponent, [x, y]);
      // Simulate an attack
      opponentGameBoard.receiveAttack([x, y]);
    
      // Re-render both boards after the attack
      renderGameBoard(opponentGameBoard, opponentBoardElement);

      // Check if all opponent ships are sunk
      if (opponentGameBoard.allShipsSunk()) {
        alert("You win!");
        return;
      }
      gameController.takeTurn([x, y]); // ADDED TO CALL ATTACK FUNCTION

      // Delay the computer's turn to simulate "thinking"
      setTimeout(() => {
        computerAttack(playerBoardElement);

      }, 100); // 1-second delay
    });
  });


}

export function computerAttack() {
    //const opponentCells = opponentBoardElement.querySelectorAll(".cell");

   
    
  if (opponent.previousAttacks.length === 0) {
    // No hits to follow up on, perform random attack
    const randomCoord = opponent.generateRandomAttack();
    //playerGameBoard.receiveAttack(randomCoord);

    console.log(
      `Computer attacks cell (${randomCoord[0]}, ${randomCoord[1]}) on player's board.`
    );

    if (playerGameBoard.receiveAttack(randomCoord)) {
    opponent.enqueueAdjacentCells(randomCoord); // Add to hitQueue on successful hit
    //opponent.attack(player, randomCoord);

    }
  } else {
    // Prioritize attacking adjacent cells
    const smartCoord = opponent.generateSmartAttack();
    console.log(
      `Computer attacks cell (${smartCoord[0]}, ${smartCoord[1]}) on player's board.`
    );

    //playerGameBoard.receiveAttack(smartCoord);

    if (playerGameBoard.receiveAttack(smartCoord)) {
      opponent.enqueueAdjacentCells(smartCoord); // Add to hitQueue on successful hit
     //opponent.attack(player, smartCoord);
    }
  }

  // Re-render the player's board
  renderGameBoard(playerGameBoard, playerBoardElement);

  // Check if all player's ships are sunk
  if (playerGameBoard.allShipsSunk()) {
    alert("Computer wins!");
    return;
  }

  setTimeout(() => {
    renderUIAttack(opponentBoardElement);
  }, 100);
  
}

// Call the function to initialize hover and click effects
//renderUIAttack();
