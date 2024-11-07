const Ship = require('./ship.js');

test('Test for initializing a Ship with a specific length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
});

test('Test hit() to ensure hits count increases correctly', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('Test isSunk() to verify it returns true only when hits equals or exceeds length', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);

    ship.hit()
    expect(ship.isSunk()).toBe(false);

    ship.hit()
    expect(ship.isSunk()).toBe(false);

    ship.hit()
    expect(ship.isSunk()).toBe(true);

    ship.hit()
    expect(ship.isSunk()).toBe(true);
});