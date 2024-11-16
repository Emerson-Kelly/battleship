
const Player = require('./player.js');
const GameBoard = require('./gameBoard.js');  // Import Gameboard if used directly
const Ship = require('./ship.js');

test("Player's attack() calls opponent's receiveAttack", () => {
    const player = new Player(true);
    const opponent = new Player(false);

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

    const computer = new Player(false);  // Computer player

    for (let i = 0; i < 20; i++) {  // Test multiple times to ensure consistency
        const coord = computer.generateRandomAttack();
        const [x, y] = coord;

        // Check that coordinates are within grid bounds
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
    }
});

test("generateRandomAttack() produces unique coordinates", () => {

    const computer = new Player(false);  // Computer player

    // Store generated coordinates to check for duplicates
    const generatedCoords = new Set();

    for (let i = 0; i < 20; i++) {  // Generate multiple times to check uniqueness
        const coord = computer.generateRandomAttack();
        const coordString = coord.toString();  // Convert to string for set comparison

        // Check if coordinate is unique
        expect(generatedCoords.has(coordString)).toBe(false);

        // Add coordinate to the set for further checks
        generatedCoords.add(coordString);
    }
});

describe("Player intelligent attack tests", () => {
    
    test("attack() records hits and queues adjacent cells", () => {
        const player = new Player(true);
        const opponent = new Player(false);
        opponent.gameBoard.placeShip(new Ship(3), [3, 3], 'horizontal'); // Place a 3 length ship at (3,3)

        // Spy on opponent's receiveAttack method
        const receiveAttackSpy = jest.spyOn(opponent.gameBoard, 'receiveAttack');

        // Attack and hit the ship at (3,3)
        player.attack(opponent, [3, 3]);

        // Check if receiveAttack was called with the correct coordinates
        expect(receiveAttackSpy).toHaveBeenCalledWith([3, 3]);
        
        // Verify that adjacent cells to (3,3) are in the hitQueue
        expect(player.hitQueue).toEqual(expect.arrayContaining([
            [4, 3], [2, 3], [3, 4], [3, 2]
        ]));
    });

    test("generateSmartAttack() prioritizes hitQueue when available", () => {
        const player = new Player(true);
        
        // Mock hitQueue with adjacent coordinates
        player.hitQueue = [[2, 2], [2, 3], [2, 4]];

        // Call generateSmartAttack and verify it returns the first item in hitQueue
        const attackCoord = player.generateSmartAttack();
        expect(attackCoord).toEqual([2, 2]);

        // Confirm that hitQueue is updated (first item removed)
        expect(player.hitQueue).toEqual([[2, 3], [2, 4]]);
    });

    test("generateSmartAttack() falls back to random attack when hitQueue is empty", () => {
        const player = new Player(true);
    
        // Empty the hitQueue
        player.hitQueue = [];
    
        // Generate multiple random attacks to ensure each is unique
        const generatedCoords = new Set();
    
        for (let i = 0; i < 20; i++) {
            const coord = player.generateSmartAttack();
            const coordString = coord.toString();  // Convert to string for Set comparison
    
            // Check if coordinate is unique
            expect(generatedCoords.has(coordString)).toBe(false);
    
            // Add coordinate to the set for further checks
            generatedCoords.add(coordString);
        }
    });

    test("attack() and generateSmartAttack() work together to ensure unique, prioritized attacks", () => {
        const player = new Player(true);
        const opponent = new Player(false);
       
        // Player places ships on their board
        player.gameBoard.placeShip(new Ship(3), [5, 5], 'horizontal');

        // opponent attacks and hits the ship at (5,5), adding adjacent cells to the player's hitQueue
        opponent.attack(player, [5, 5]);

        // Verify adjacent cells are added to the queue
        expect(opponent.hitQueue).toEqual(expect.arrayContaining([
            [6, 5], [4, 5], [5, 6], [5, 4]
        ]));

        // Use generateSmartAttack and ensure it returns coordinates from hitQueue
        const nextAttack = opponent.generateSmartAttack();
        expect(opponent.hitQueue).not.toContain(nextAttack);
        expect(opponent.previousAttacks).toContainEqual(nextAttack);
    });
});
