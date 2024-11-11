"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["player"],{

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nclass GameBoard {\n    constructor(size = 10) {\n        this.grid = Array(size).fill(null).map(() => Array(size).fill(null));\n        this.missedShots = [];\n        this.ships = [];\n    }\n\n    placeShip(ship, startCoord, direction) {\n\n        const [startX, startY] = startCoord;\n        const length = ship.length;\n\n        const [endX, endY] = this.calculateEndCoordinates(startX, startY, length, direction)\n       \n        if (endX >= this.grid.length || endY >= this.grid[0].length) {\n            throw new Error (\"Ship placement is out of bounds\");\n        }\n\n        // Check if ship overlaps with existing ships\n        for (let i = 0; i < length; i++) {\n            const x = direction === \"horizontal\" ? startX : startX + i;\n            const y = direction === \"horizontal\" ? startY + i : startY;\n            \n            if (this.grid[x][y] !== null) {\n                throw new Error(\"Ship placement overlaps with another ship\");\n            }\n        }\n\n        // Place the ship on the grid\n        for (let i = 0; i < length; i++) {\n            const x = direction === \"horizontal\" ? startX : startX + i;\n            const y = direction === \"horizontal\" ? startY + i : startY;\n            \n            this.grid[x][y] = ship;  // Place ship reference in grid\n        }\n\n        // Add ship to ships array for tracking\n        this.ships.push(ship);\n    }\n\n    receiveAttack(coord) {\n        const [x, y] = coord;\n        if (this.grid[x][y]) {\n            this.grid[x][y].hit();\n            return true; // hit\n        } else {\n            this.missedShots.push(coord);\n            return false; // miss\n        }\n    }\n\n    allShipsSunk() {\n        return this.ships.every(ship => ship.isSunk());\n    }\n\n    calculateEndCoordinates(startX, startY, length, direction) {\n        let endX = startX;\n        let endY = startY;\n\n        if (direction === \"horizontal\") {\n            endY = startY + length - 1;\n        } else if (direction === \"vertical\") {\n            endX = startX + length - 1;\n        }\n\n        return [endX, endY];\n    }\n}\n\nmodule.exports = GameBoard;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZUJvYXJkLmpzIiwibWFwcGluZ3MiOiI7OztBQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixVQUFVO0FBQ1Y7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcz8yOGIzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcC5qcyc7XG5cbmNsYXNzIEdhbWVCb2FyZCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSA9IDEwKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IEFycmF5KHNpemUpLmZpbGwobnVsbCkubWFwKCgpID0+IEFycmF5KHNpemUpLmZpbGwobnVsbCkpO1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc2hpcCwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgY29uc3QgW3N0YXJ0WCwgc3RhcnRZXSA9IHN0YXJ0Q29vcmQ7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IFtlbmRYLCBlbmRZXSA9IHRoaXMuY2FsY3VsYXRlRW5kQ29vcmRpbmF0ZXMoc3RhcnRYLCBzdGFydFksIGxlbmd0aCwgZGlyZWN0aW9uKVxuICAgICAgIFxuICAgICAgICBpZiAoZW5kWCA+PSB0aGlzLmdyaWQubGVuZ3RoIHx8IGVuZFkgPj0gdGhpcy5ncmlkWzBdLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIChcIlNoaXAgcGxhY2VtZW50IGlzIG91dCBvZiBib3VuZHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBzaGlwIG92ZXJsYXBzIHdpdGggZXhpc3Rpbmcgc2hpcHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyBzdGFydFggOiBzdGFydFggKyBpO1xuICAgICAgICAgICAgY29uc3QgeSA9IGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyBzdGFydFkgKyBpIDogc3RhcnRZO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5ncmlkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBwbGFjZW1lbnQgb3ZlcmxhcHMgd2l0aCBhbm90aGVyIHNoaXBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQbGFjZSB0aGUgc2hpcCBvbiB0aGUgZ3JpZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIiA/IHN0YXJ0WCA6IHN0YXJ0WCArIGk7XG4gICAgICAgICAgICBjb25zdCB5ID0gZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIiA/IHN0YXJ0WSArIGkgOiBzdGFydFk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IHNoaXA7ICAvLyBQbGFjZSBzaGlwIHJlZmVyZW5jZSBpbiBncmlkXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgc2hpcCB0byBzaGlwcyBhcnJheSBmb3IgdHJhY2tpbmdcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gY29vcmQ7XG4gICAgICAgIGlmICh0aGlzLmdyaWRbeF1beV0pIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBoaXRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChjb29yZCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG1pc3NcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVFbmRDb29yZGluYXRlcyhzdGFydFgsIHN0YXJ0WSwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IGVuZFggPSBzdGFydFg7XG4gICAgICAgIGxldCBlbmRZID0gc3RhcnRZO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBlbmRZID0gc3RhcnRZICsgbGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgZW5kWCA9IHN0YXJ0WCArIGxlbmd0aCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW2VuZFgsIGVuZFldO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lQm9hcmQ7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/gameBoard.js\n");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _gameBoard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard.js */ \"./src/gameBoard.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\nmodule.exports = _gameBoard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGxheWVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBNkI7QUFDVTs7QUFFdkMsaUJBQWlCLHFEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanM/YThhMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZC5qc1wiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVCb2FyZDsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/player.js\n");

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/player.js"));
/******/ }
]);