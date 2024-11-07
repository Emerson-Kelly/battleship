import Ship from './ship.js';

class GameBoard {
    constructor(size = 10) {
        this.grid = Array(size).fill(null).map(() => Array(size).fill(null));
        this.missedShots = [];
        this.ships = [];
    }

    placeShip(ship, startCoord, direction) {

        const [startX, startY] = startCoord;
        const length = ship.length;

        const [endX, endY] = this.calculateEndCoordinates(startX, startY, length, direction)
       
        if (endX >= this.grid.length || endY >= this.grid[0].length) {
            throw new Error ("Ship placement is out of bounds");
        }

        // Check if ship overlaps with existing ships
        for (let i = 0; i < length; i++) {
            const x = direction === "horizontal" ? startX : startX + i;
            const y = direction === "horizontal" ? startY + i : startY;
            
            if (this.grid[x][y] !== null) {
                throw new Error("Ship placement overlaps with another ship");
            }
        }

        // Place the ship on the grid
        for (let i = 0; i < length; i++) {
            const x = direction === "horizontal" ? startX : startX + i;
            const y = direction === "horizontal" ? startY + i : startY;
            
            this.grid[x][y] = ship;  // Place ship reference in grid
        }

        // Add ship to ships array for tracking
        this.ships.push(ship);
    }

    receiveAttack(coord) {
        const [x, y] = coord;
        if (this.grid[x][y]) {
            this.grid[x][y].hit();
            return true; // hit
        } else {
            this.missedShots.push(coord);
            return false; // miss
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    calculateEndCoordinates(startX, startY, length, direction) {
        let endX = startX;
        let endY = startY;

        if (direction === "horizontal") {
            endY = startY + length - 1;
        } else if (direction === "vertical") {
            endX = startX + length - 1;
        }

        return [endX, endY];
    }
}

module.exports = GameBoard;