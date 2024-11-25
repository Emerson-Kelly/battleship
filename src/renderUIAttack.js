import renderGameBoard from "./renderBoard";
import GameBoard from "./gameBoard";
import { opponentGameBoard } from "./renderBoard";
import { playerGameBoard } from "./renderBoard";

export default function renderUIAttack() {
   

    const opponentBoardElement = document.getElementById("opponent-game-board");
    const playerBoardElement = document.getElementById("player-game-board");
    const cells = opponentBoardElement.querySelectorAll('.cell'); // Select cells only in the opponent board

    cells.forEach(cell => {
        // Add hover effect for each opponent cell
        cell.addEventListener('mouseover', () => {
            cell.classList.add('cell:hover'); // Add hover class
        });

        if (!opponentBoardElement) {
            cell.addEventListener('mouseout', () => {
                cell.classList.remove('cell:hover'); // Remove hover class
            });
        }
       

        // Add click event
        cell.addEventListener('click', () => {
            const x = parseInt(cell.getAttribute('data-x'), 10);
            const y = parseInt(cell.getAttribute('data-y'), 10);

            console.log(`Player attacks cell (${x}, ${y}) on opponent's board.`);

            // Simulate an attack
            opponentGameBoard.receiveAttack([x, y]);
            console.log('Cell clicked!');

             // Re-render both boards after the attack
             renderGameBoard(opponentGameBoard, opponentBoardElement);
             renderGameBoard(playerGameBoard, playerBoardElement);
        });
    });
}

// Call the function to initialize hover and click effects
//renderUIAttack();
