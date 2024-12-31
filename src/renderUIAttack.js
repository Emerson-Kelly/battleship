import renderGameBoard from "./renderBoard.js";
import GameBoard from "./gameBoard";
import { opponentGameBoard } from "./renderBoard.js";
import { playerGameBoard } from "./renderBoard.js";
import GameBoardController from "./gameController";
import { gameController } from "./index.js";
import Player from "./player.js";
import { player, opponent } from "./index.js";
import displayLoadingAnimation from "./opponentLoadingAnimation.js";
import displayEndGameAlertBanner from "./gameAlertBanner.js";

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
    
      // Re-render the opponents board after the attack
      renderGameBoard(opponentGameBoard, opponentBoardElement);
      // Check if all opponent ships are sunk
      if (opponentGameBoard.allShipsSunk()) {
        displayEndGameAlertBanner("You win!");
        //alert("You win!");
        return;
      }
      gameController.takeTurn([x, y]); // ADDED TO CALL ATTACK FUNCTION
      setTimeout(() => {
        displayLoadingAnimation();
      }, 4000);

      // Delay the computer's turn to simulate "thinking"
      setTimeout(() => {
        computerAttack(playerBoardElement);
      }, 6000);
    });
  });


}

export function computerAttack() {
    let randomCoord;
  
    // If there are previous attacks (hit queue exists)
    if (opponent.previousHits.length > 0) {
      const smartCoord = opponent.generateSmartAttack();
      console.log(
        `Computer attacks cell (${smartCoord[0]}, ${smartCoord[1]}) on player's board.`
      );
  
      // Perform the attack on the player's game board and capture the result
      const attackResult = playerGameBoard.receiveAttack(smartCoord);
  
      if (attackResult) {
        opponent.enqueueAdjacentCells(smartCoord); // Add adjacent cells to hit queue
      }
  
      // Check if the ship has been sunk after the attack
      if (attackResult === "SUNK") {
        console.log(`Ship at ${smartCoord} has been sunk!`);
  
        // After sinking the ship, switch to random attack
        opponent.hitQueue = []; // Clear the hit queue to start generating random attacks
        randomCoord = opponent.generateRandomAttack(); // Generate a random attack
  
        console.log(
          `Computer is now switching to random attack. New random attack: ${randomCoord}`
        );
      }
    } else {
      // No hits to follow up on, perform random attack
      randomCoord = opponent.generateRandomAttack();
      console.log(
        `Computer attacks cell (${randomCoord[0]}, ${randomCoord[1]}) on player's board.`
      );
  
      // Perform the random attack on the player's game board
      const attackResult = playerGameBoard.receiveAttack(randomCoord);
  
      if (attackResult) {
        opponent.enqueueAdjacentCells(randomCoord); // Add to hitQueue if successful hit
      }
    }
  
    // Re-render the player's board after the computer's attack
    renderGameBoard(playerGameBoard, playerBoardElement);
  
    // Check if all the player's ships are sunk
    if (playerGameBoard.allShipsSunk()) {
      displayEndGameAlertBanner("Computer wins!");
      return;
    }
  
    // Re-enable player interaction after the computer attack
    setTimeout(() => {
      renderUIAttack(opponentBoardElement);
    }, 3000);
  }
  

// Call the function to initialize hover and click effects
//renderUIAttack();
