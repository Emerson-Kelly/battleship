import Ship from "./ship.js";
import renderGameBoard from "./renderBoard.js";
import carrierIcon from "./assets/ships/carrierIcon.svg";
import battleshipIcon from "./assets/ships/battleshipIcon.svg";
import destroyerIcon from "./assets/ships/destroyerIcon.svg";
import submarineIcon from "./assets/ships/submarineIcon.svg";
import patrolIcon from "./assets/ships/patrolIcon.svg";

// Global variables to track ship data during drag-and-drop
let currentShipLength = 0;
let currentOrientation = "horizontal";

export default function playerBoardPlacement(gameBoard) {
  // Display the draggable ships at the top of the board
  shipPlacementComponent();

  const playerGameBoardElement = document.getElementById("player-game-board");

  // Add event listeners for drag-and-drop on the game board
  playerGameBoardElement.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow dropping
    clearHoverHighlights();

    const targetCell = e.target.closest(".cell");
    if (targetCell) {
      const row = parseInt(targetCell.dataset.x, 10);
      const col = parseInt(targetCell.dataset.y, 10);

      // Highlight cells based on the ship's length and orientation
      for (let i = 0; i < currentShipLength; i++) {
        const hoverRow = currentOrientation === "horizontal" ? row : row + i;
        const hoverCol = currentOrientation === "horizontal" ? col + i : col;

        // Ensure within bounds
        if (hoverRow < 10 && hoverCol < 10) {
          const hoverCell = playerGameBoardElement.querySelector(
            `[data-x="${hoverRow}"][data-y="${hoverCol}"]`
          );
          if (hoverCell) hoverCell.classList.add("hover");
        }
      }
    }
  });

  playerGameBoardElement.addEventListener("dragleave", clearHoverHighlights);

  playerGameBoardElement.addEventListener("drop", (e) => {
    e.preventDefault();
    clearHoverHighlights();

    const targetCell = e.target.closest(".cell");
    const draggedShipType = e.dataTransfer.getData("ship-type");
    const draggedShipElement = document.querySelector(`.${draggedShipType}`); // Get the dragged ship element

    if (targetCell && draggedShipType) {
      const row = parseInt(targetCell.dataset.x, 10);
      const col = parseInt(targetCell.dataset.y, 10);

      if (isValidPlacement(gameBoard, currentShipLength, [row, col], currentOrientation)) {
        const ship = createShip(draggedShipType);
        gameBoard.placeShip(ship, [row, col], currentOrientation);
        renderGameBoard(gameBoard, playerGameBoardElement);

        // Hide the dragged ship after successful placement
        if (draggedShipElement) {
          draggedShipElement.style.opacity = "0.5";
          draggedShipElement.style.pointerEvents = "none";
        }
      } else {
        alert("Invalid placement!");
      }
    }
  });

  // Helper to clear hover highlights
  function clearHoverHighlights() {
    const hoverCells = playerGameBoardElement.querySelectorAll(".cell.hover");
    hoverCells.forEach((cell) => cell.classList.remove("hover"));
  }
}

// Helper to get ship length by type
function getShipLength(type) {
  const lengths = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    "patrol-boat": 2,
  };
  return lengths[type];
}

// Helper to create a Ship instance by type
function createShip(type) {
  const length = getShipLength(type);
  return new Ship(length, type);
}

// Helper to check if a placement is valid
function isValidPlacement(gameBoard, shipLength, startPosition, orientation) {
  const [row, col] = startPosition;

  // Check boundaries
  if (orientation === "horizontal" && col + shipLength > 10) return false;
  if (orientation === "vertical" && row + shipLength > 10) return false;

  // Check for overlap
  for (let i = 0; i < shipLength; i++) {
    const checkRow = orientation === "horizontal" ? row : row + i;
    const checkCol = orientation === "horizontal" ? col + i : col;

    if (gameBoard.grid[checkRow][checkCol] !== "~") return false;
  }

  return true;
}

// Function to render draggable ships
function shipPlacementComponent() {
  const playerOneGameBoard = document.querySelector(".player-one");
  const dragDropShipsContainer = document.createElement("div");
  dragDropShipsContainer.classList.add("drag-drop-ships-container");
  playerOneGameBoard.prepend(dragDropShipsContainer);

  const ships = [
    { src: carrierIcon, alt: "Carrier", type: "carrier", length: 5, orientation: "horizontal" },
    { src: battleshipIcon, alt: "Battleship", type: "battleship", length: 4, orientation: "horizontal" },
    { src: destroyerIcon, alt: "Destroyer", type: "destroyer", length: 3, orientation: "horizontal" },
    { src: submarineIcon, alt: "Submarine", type: "submarine", length: 3, orientation: "horizontal" },
    { src: patrolIcon, alt: "Patrol", type: "patrol-boat", length: 2, orientation: "horizontal" },
  ];

  ships.forEach(({ src, alt, type, length, orientation }) => {
    const shipImg = document.createElement("img");
    shipImg.src = src;
    shipImg.alt = alt;
    shipImg.orientation = orientation;
    shipImg.classList.add(type);
    shipImg.setAttribute("draggable", true);
    shipImg.dataset.length = length;

    shipImg.addEventListener("click", (e) => {
      if (shipImg.orientation === "horizontal") {
        shipImg.orientation = "vertical";
        shipImg.style.transform = "rotate(90deg)";
      } else if (shipImg.orientation === "vertical") {
        shipImg.orientation = "horizontal";
        shipImg.style.transform = "rotate(0deg)";
      }
    });
    shipImg.addEventListener("dragstart", (e) => {
        currentShipLength = parseInt(shipImg.dataset.length, 10); // Set global variable
        currentOrientation = shipImg.orientation; // Set global variable
        e.dataTransfer.setData("ship-type", type); // Retain this for ship type
      
        // Adjust drag preview based on orientation
        const rotation = currentOrientation === "vertical" ? "rotate(90deg)" : "rotate(0deg)";
        shipImg.style.transform = rotation;
      
        // Use the original ship image as the drag preview
        e.dataTransfer.setDragImage(
          shipImg,
          currentOrientation === "horizontal" ? 30 * currentShipLength : 30,
          currentOrientation === "horizontal" ? 30 : 30 * currentShipLength
        );
      
        console.log(
          "Dragstart - Ship Length:",
          currentShipLength,
          "Orientation:",
          currentOrientation
        );
      });
      

    dragDropShipsContainer.appendChild(shipImg);
  });
}
