import Ship from "./ship.js";
import renderGameBoard from "./renderBoard.js";
import carrierIcon from "./assets/ships/carrierIcon.svg";
import battleshipIcon from "./assets/ships/battleshipIcon.svg";
import destroyerIcon from "./assets/ships/destroyerIcon.svg";
import submarineIcon from "./assets/ships/submarineIcon.svg";
import patrolIcon from "./assets/ships/patrolIcon.svg";

export default function playerBoardPlacement(gameBoard) {
  // Display the draggable ships at the top of the board
  shipPlacementComponent();

  const playerGameBoardElement = document.getElementById("player-game-board");

  // Add event listeners for drag-and-drop on the game board
  playerGameBoardElement.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow dropping
    const targetCell = e.target.closest(".cell");
    if (targetCell) targetCell.classList.add("hover");
  });

  playerGameBoardElement.addEventListener("dragleave", (e) => {
    const targetCell = e.target.closest(".cell");
    if (targetCell) targetCell.classList.remove("hover");
  });

  playerGameBoardElement.addEventListener("drop", (e) => {
    e.preventDefault();
    const targetCell = e.target.closest(".cell");
    const draggedShipType = e.dataTransfer.getData("ship-type");
    const draggedShipElement = document.querySelector(`.${draggedShipType}`); // Get the dragged ship element
  
    if (targetCell && draggedShipType) {
      const row = parseInt(targetCell.dataset.x, 10);
      const col = parseInt(targetCell.dataset.y, 10);
      const orientation = e.dataTransfer.getData("orientation");
  
      const shipLength = getShipLength(draggedShipType);
  
      if (isValidPlacement(gameBoard, shipLength, [row, col], orientation)) {
        const ship = createShip(draggedShipType);
        gameBoard.placeShip(ship, [row, col], orientation);
        renderGameBoard(gameBoard, playerGameBoardElement);
  
        // Hide the dragged ship after successful placement
        if (draggedShipElement) {
          draggedShipElement.style.display = "none";
        }
      } else {
        alert("Invalid placement!");
      }
    }
  });
  
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
    { src: carrierIcon, alt: "Carrier", type: "carrier" },
    { src: battleshipIcon, alt: "Battleship", type: "battleship" },
    { src: destroyerIcon, alt: "Destroyer", type: "destroyer" },
    { src: submarineIcon, alt: "Submarine", type: "submarine" },
    { src: patrolIcon, alt: "Patrol", type: "patrol-boat" },
  ];

  ships.forEach(({ src, alt, type }) => {
    const shipImg = document.createElement("img");
    shipImg.src = src;
    shipImg.alt = alt;
    shipImg.classList.add(type);
    shipImg.setAttribute("draggable", true);

    shipImg.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("ship-type", type);
      e.dataTransfer.setData("orientation", "horizontal"); // Default orientation
    });

    dragDropShipsContainer.appendChild(shipImg);

  });
}
