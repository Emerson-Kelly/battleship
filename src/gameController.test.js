
const GameBoardController = require('./gameController');
const Player = require('./player');
const Ship = require('./ship');
const GameBoard = require('./gameBoard.js');

describe("GameController", () => {
    
    let gameController;

    beforeEach(() => {
        gameController = new GameBoardController();
    });

    // Test for initializeGame()
    test("initializeGame() places ships on each player’s board", () => {
        gameController.initializeGame();

        // Check that ships are placed on both players' boards
        expect(gameController.player.gameBoard.ships.length).toBeGreaterThan(0);
        expect(gameController.computer.gameBoard.ships.length).toBeGreaterThan(0);

        // Check that each placed ship has coordinates on the grid
        gameController.player.gameBoard.ships.forEach(ship => {
            expect(ship).toBeInstanceOf(Ship);
            expect(ship.length).toBeGreaterThan(0);
        });
        gameController.computer.gameBoard.ships.forEach(ship => {
            expect(ship).toBeInstanceOf(Ship);
            expect(ship.length).toBeGreaterThan(0);
        });
    });
    
    // Test for takeTurn()
    test("takeTurn() processes the attack and switches turns", () => {
        gameController.initializeGame();

        const opponent = gameController.getOpponent();
        
        // Mock the opponent's receiveAttack method to monitor calls
        const receiveAttackSpy = jest.spyOn(opponent.gameBoard, 'receiveAttack');
        
        // Take a turn with a sample coordinate
        let coord = [3, 3];
        gameController.takeTurn(coord);

        // Verify that receiveAttack is called on opponent’s gameboard
        expect(receiveAttackSpy).toHaveBeenCalledWith(coord);

        // Verify that the currentPlayer has switched after the turn
        expect(gameController.currentPlayer).toBe(opponent);
        
      
        // Test miss
        coord = [5, 5];  // Assuming no ship at this position
        gameController.takeTurn(coord);
        
        //expect(opponent.gameBoard.grid[0][1]).toBe('O');
        //expect(opponent.gameBoard.grid[0][1]).toBe(false);
        
    });
    
    // Test for checkGameOver()
    test("checkGameOver() returns true if one player's ships are all sunk", () => {
        gameController.initializeGame();

        // Mock allShipsSunk for player and computer gameBoards
        jest.spyOn(gameController.player.gameBoard, 'allShipsSunk').mockReturnValue(false);
        jest.spyOn(gameController.computer.gameBoard, 'allShipsSunk').mockReturnValue(true);

        // Check if game is over (should return true because computer's ships are sunk)
        expect(gameController.checkGameOver()).toBe(true);

        // Reset for the other scenario
        gameController.computer.gameBoard.allShipsSunk.mockReturnValue(false);
        gameController.player.gameBoard.allShipsSunk.mockReturnValue(true);

        // Check if game is over (should return true because player's ships are sunk)
        expect(gameController.checkGameOver()).toBe(true);
    });

    // Test for startGame() ensuring it ends when checkGameOver() is true
    test("startGame() ends when checkGameOver() returns true", () => {
        gameController.initializeGame();

        // Mock checkGameOver to return true immediately for this test
        const checkGameOverSpy = jest.spyOn(gameController, 'checkGameOver').mockReturnValue(true);

        gameController.startGame();

        // Verify that startGame stopped when checkGameOver returned true
        expect(checkGameOverSpy).toHaveBeenCalled();
    });
   
    // Test for switchTurns()
    test("switchTurns() changes the current player", () => {
        gameController.initializeGame();

        const initialPlayer = gameController.currentPlayer;

        // Switch turns 
        gameController.switchTurns();

        // Verify that the current player is now the other player
        expect(gameController.currentPlayer).not.toBe(initialPlayer);

        // Switch back and confirm the initial player is restored
        gameController.switchTurns();

        expect(gameController.currentPlayer).toBe(initialPlayer);
    });

    // Additional helper function tests
    test("getOpponent() returns the opposite player", () => {
        gameController.initializeGame();

        const initialPlayer = gameController.currentPlayer;
        const opponent = gameController.getOpponent();

        // Confirm opponent is not the current player
        expect(opponent).not.toBe(initialPlayer);

        // Switch turns and verify that the new opponent is the initial player
        gameController.switchTurns();
        expect(gameController.getOpponent()).toBe(initialPlayer);
    });
  
});
 