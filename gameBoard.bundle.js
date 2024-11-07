"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameBoard"],{

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nclass GameBoard {\n    constructor(size = 10) {\n        this.grid = Array(size).fill(null).map(() => Array(size).fill(null));\n        this.missedShots = [];\n        this.ships = [];\n    }\n\n    placeShip(ship, startCoord, direction) {\n        // Calculate the end coordinates based on length and direction\n        const [startX, startY] = startCoord;\n        const length = ship.length;\n\n        const [endX, endY] = this.calculateEndCoordinates(startX, startY, length, direction)\n        // Place the ship on the grid by filling the grid with ship references\n\n        // Add the ship to this.ships array\n\n    }\n\n    receiveAttack(coord) {\n        const [x, y] = coord;\n        if (this.grid[x][y]) {\n            this.grid[x][y].hit();\n            return true; // hit\n        } else {\n            this.missedShots.push(coord);\n            return false; // miss\n        }\n    }\n\n    allShipsSunk() {\n        return this.ships.every(ship => ship.isSunk());\n    }\n\n    calculateEndCoordinates(startX, startY, length, direction) {\n        let endX = startX;\n        let endY = startY;\n\n        if (direction === \"horizontal\") {\n            endY = startY + length - 1;\n        } else if (direction === \"vertical\") {\n            endX = startX + length - 1;\n        }\n\n        return [endX, endY];\n    }\n}\n\nmodule.exports = GameBoard;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZUJvYXJkLmpzIiwibWFwcGluZ3MiOiI7OztBQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsVUFBVTtBQUNWO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanM/MjhiMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwLmpzJztcblxuY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplID0gMTApIHtcbiAgICAgICAgdGhpcy5ncmlkID0gQXJyYXkoc2l6ZSkuZmlsbChudWxsKS5tYXAoKCkgPT4gQXJyYXkoc2l6ZSkuZmlsbChudWxsKSk7XG4gICAgICAgIHRoaXMubWlzc2VkU2hvdHMgPSBbXTtcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgIH1cblxuICAgIHBsYWNlU2hpcChzaGlwLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBlbmQgY29vcmRpbmF0ZXMgYmFzZWQgb24gbGVuZ3RoIGFuZCBkaXJlY3Rpb25cbiAgICAgICAgY29uc3QgW3N0YXJ0WCwgc3RhcnRZXSA9IHN0YXJ0Q29vcmQ7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IFtlbmRYLCBlbmRZXSA9IHRoaXMuY2FsY3VsYXRlRW5kQ29vcmRpbmF0ZXMoc3RhcnRYLCBzdGFydFksIGxlbmd0aCwgZGlyZWN0aW9uKVxuICAgICAgICAvLyBQbGFjZSB0aGUgc2hpcCBvbiB0aGUgZ3JpZCBieSBmaWxsaW5nIHRoZSBncmlkIHdpdGggc2hpcCByZWZlcmVuY2VzXG5cbiAgICAgICAgLy8gQWRkIHRoZSBzaGlwIHRvIHRoaXMuc2hpcHMgYXJyYXlcblxuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gY29vcmQ7XG4gICAgICAgIGlmICh0aGlzLmdyaWRbeF1beV0pIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBoaXRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChjb29yZCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG1pc3NcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVFbmRDb29yZGluYXRlcyhzdGFydFgsIHN0YXJ0WSwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IGVuZFggPSBzdGFydFg7XG4gICAgICAgIGxldCBlbmRZID0gc3RhcnRZO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBlbmRZID0gc3RhcnRZICsgbGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgZW5kWCA9IHN0YXJ0WCArIGxlbmd0aCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW2VuZFgsIGVuZFldO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lQm9hcmQ7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/gameBoard.js\n");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\nclass Ship {\n    constructor (length) {\n        this.length = length;\n        this.hits = 0;\n    }\n\n    hit () {\n        this.hits += 1;\n    }\n\n    isSunk () {\n        return this.hits >= this.length;\n    }\n}\n  module.exports = Ship;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hpcC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanM/ZDAzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvciAobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgIH1cblxuICAgIGhpdCAoKSB7XG4gICAgICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIH1cblxuICAgIGlzU3VuayAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gICAgfVxufVxuICBtb2R1bGUuZXhwb3J0cyA9IFNoaXA7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/ship.js\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameBoard.js"));
/******/ }
]);