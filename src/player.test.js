const Player = require('./player.js');
const GameBoard = require('./gameBoard.js');  // Import Gameboard if used directly
const Ship = require('./ship.js');

test("Player's attack() calls opponent's receiveAttack", () => {
    const player = new Player();
    const opponent = new Player();

    // Place a ship on opponent's Gameboard at (3, 3) for testing
    const ship = new Ship(3);
    opponent.gameBoard.placeShip(ship, [3, 3], "horizontal");

    // Spy on the opponent's gameboard's receiveAttack method
    const receiveAttackSpy = jest.spyOn(opponent.gameBoard, 'receiveAttack');

    // Player attacks the opponent at (3, 3)
    player.attack(opponent, [3, 3]);

    // Check if receiveAttack was called with correct coordinates
    expect(receiveAttackSpy).toHaveBeenCalledWith([3, 3]);
});

test("generateRandomAttack() produces valid coordinates within bounds", () => {

    const player = new Player(true);  // Computer player

    for (let i = 0; i < 20; i++) {  // Test multiple times to ensure consistency
        const coord = player.generateRandomAttack();
        const [x, y] = coord;

        // Check that coordinates are within grid bounds
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
    }
});

test("generateRandomAttack() produces unique coordinates", () => {

    const player = new Player(true);  // Computer player

    // Store generated coordinates to check for duplicates
    const generatedCoords = new Set();

    for (let i = 0; i < 20; i++) {  // Generate multiple times to check uniqueness
        const coord = player.generateRandomAttack();
        const coordString = coord.toString();  // Convert to string for set comparison

        // Check if coordinate is unique
        expect(generatedCoords.has(coordString)).toBe(false);

        // Add coordinate to the set for further checks
        generatedCoords.add(coordString);
    }
});

