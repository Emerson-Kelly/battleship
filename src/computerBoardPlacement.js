import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";

// Randomize computer ships at the start of each game
export default function computerBoardPlacement(gameBoard) {
  const ships = [
    { type: "carrier", length: 5 },
    { type: "battleship", length: 4 },
    { type: "destroyer", length: 3 },
    { type: "submarine", length: 3 },
    { type: "patrol-boat", length: 2 },
  ];

  // Utility function to generate a random number within a range
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Utility function to check if a ship placement is valid
  function isValidPlacement(gameBoard, ship, startPosition, orientation) {
    const [row, col] = startPosition;

    // Check boundaries
    if (orientation === "horizontal" && col + ship.length > 10) return false;
    if (orientation === "vertical" && row + ship.length > 10) return false;

    // Check for overlap with other ships
    for (let i = 0; i < ship.length; i++) {
      const checkRow = orientation === "horizontal" ? row : row + i;
      const checkCol = orientation === "horizontal" ? col + i : col;

      if (gameBoard.grid[checkRow][checkCol] !== "~") {
        return false; // Ship overlaps with another ship
      }
    }

    return true; // Placement is valid
  }

  // Loop through each ship and place it randomly on the board
  ships.forEach((shipInfo) => {
    const ship = new Ship(shipInfo.length, shipInfo.type);
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      const startPosition = [getRandomInt(0, 9), getRandomInt(0, 9)];

      if (isValidPlacement(gameBoard, ship, startPosition, orientation)) {
        gameBoard.placeShip(ship, startPosition, orientation);
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      console.error(`Failed to place ${ship.type} after 100 attempts.`);
    }
    console.log(gameBoard.grid);

  });
}
