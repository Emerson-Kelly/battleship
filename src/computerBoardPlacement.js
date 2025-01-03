import Ship from "./ship.js";

// Randomize computer ships at the start of each game
export default function computerBoardPlacement(gameBoard) {
  const ships = [
    { type: "carrier", length: 5 },
    { type: "battleship", length: 4 },
    { type: "destroyer", length: 3 },
    { type: "submarine", length: 3 },
    { type: "patrol-boat", length: 2 },
  ];

  // zones/quadrants
  const zones = [
    { id: 1, rows: [0, 4], cols: [0, 4] }, // Top-left
    { id: 2, rows: [0, 4], cols: [5, 9] }, // Top-right
    { id: 3, rows: [5, 9], cols: [0, 4] }, // Bottom-left
    { id: 4, rows: [5, 9], cols: [5, 9] }, // Bottom-right
  ];

  // Initial zone probabilities
  const zoneProbabilities = {
    1: 0.25,
    2: 0.25,
    3: 0.25,
    4: 0.25,
  };

  // Function to choose a quadrant with weighted probabilities
  function chooseZone(probabilities) {
    const rand = Math.random();
    let cumulative = 0;

    for (const [zone, probability] of Object.entries(probabilities)) {
      cumulative += probability;
      if (rand < cumulative) return parseInt(zone);
    }

    return null; // Fallback
  }

  // Get a random position within the given zone
  function getRandomPosition(zone) {
    const row = getRandomInt(zone.rows[0], zone.rows[1]);
    const col = getRandomInt(zone.cols[0], zone.cols[1]);
    return [row, col];
  }

  // Get a random integer between min and max
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to check if the placement is valid
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

    return true;
  }

  // Function to check if there's enough space between ships
  function isEnoughSpace(gameBoard, startPosition, ship, orientation) {
    const [row, col] = startPosition;
    const buffer = Math.floor(Math.random() * 3) + 1; // Minimum distance buffer between ships

    // Check around the ship for available space
    for (let i = 0; i < ship.length; i++) {
      const checkRow = orientation === "horizontal" ? row : row + i;
      const checkCol = orientation === "horizontal" ? col + i : col;

      // Check for buffer space
      for (let r = -buffer; r <= buffer; r++) {
        for (let c = -buffer; c <= buffer; c++) {
          const newRow = checkRow + r;
          const newCol = checkCol + c;

          // If the cell is out of bounds or occupied, return false
          if (newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 10)
            continue;
          if (gameBoard.grid[newRow][newCol] !== "~") return false;
        }
      }
    }
    return true; // There's enough space around the ship
  }

  // Loop through each ship and place it on the board
  ships.forEach((shipInfo) => {
    const ship = new Ship(shipInfo.length, shipInfo.type);
    let placed = false;

    // Try placing the ship up to 100 times
    let attempts = 0;
    while (!placed && attempts < 100) {
      // Choose a zone based on probabilities
      const chosenZone = chooseZone(zoneProbabilities);
      const zone = zones.find((z) => z.id === chosenZone);
      const startPosition = getRandomPosition(zone);
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";

      // Ensure the ship can be placed and there's enough space
      if (
        isValidPlacement(gameBoard, ship, startPosition, orientation) &&
        isEnoughSpace(gameBoard, startPosition, ship, orientation)
      ) {
        gameBoard.placeShip(ship, startPosition, orientation);
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      console.error(`Failed to place ${ship.type} after 100 attempts.`);
    }
  });
}
