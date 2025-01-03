import GameBoard from './gameBoard.js';
import Ship from './ship.js';

test("places a ship correctly on the grid", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3);

    gameBoard.placeShip(ship, [2, 2], "horizontal");

    // Check each cell to ensure the ship is correctly placed
    expect(gameBoard.grid[2][2]).toBe(ship);
    expect(gameBoard.grid[2][3]).toBe(ship);
    expect(gameBoard.grid[2][4]).toBe(ship);
});

test("throws error when placing ship out of bounds", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(4);

    expect(() => {
        gameBoard.placeShip(ship, [8, 8], "horizontal");
    }).toThrow("Ship placement is out of bounds");
});

test("throws error when placing overlapping ships", () => {
    const gameBoard = new GameBoard();
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    gameBoard.placeShip(ship1, [1, 1], "horizontal");

    expect(() => {
        gameBoard.placeShip(ship2, [1, 2], "horizontal");
    }).toThrow("Ship placement overlaps with another ship");
});

test("registers a hit correctly on a ship", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3);
    
    gameBoard.placeShip(ship, [0, 0], "horizontal");
    const result = gameBoard.receiveAttack([0, 0]);

    expect(result).toBe(true);  // Confirm hit
    expect(ship.hits).toBe(1);  // Confirm ship's hit count increased
});

test("registers a miss correctly", () => {
    const gameBoard = new GameBoard();
    const result = gameBoard.receiveAttack([5, 5]);

    expect(result).toBe(false);  // Confirm miss
    expect(gameBoard.missedShots).toContainEqual([5, 5]);  // Confirm miss location tracked
});

test("allShipsSunk returns true only when all ships are sunk", () => {
    const gameBoard = new GameBoard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    gameBoard.placeShip(ship1, [0, 0], "horizontal");
    gameBoard.placeShip(ship2, [2, 2], "vertical");

    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 1]);  // Sink ship1

    gameBoard.receiveAttack([2, 2]);
    gameBoard.receiveAttack([3, 2]);
    gameBoard.receiveAttack([4, 2]);  // Sink ship2

    expect(gameBoard.allShipsSunk()).toBe(true);
});
   