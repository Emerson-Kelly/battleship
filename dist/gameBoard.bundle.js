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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _assets_audio_shot_sound_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/audio/shot-sound.mp3 */ \"./src/assets/audio/shot-sound.mp3\");\n/* harmony import */ var _assets_audio_hit_sound_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/audio/hit-sound.mp3 */ \"./src/assets/audio/hit-sound.mp3\");\n/* harmony import */ var _assets_audio_miss_sound_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/audio/miss-sound.mp3 */ \"./src/assets/audio/miss-sound.mp3\");\n\n\n\n\nclass GameBoard {\n  constructor() {\n    this.grid = Array(10).fill(null).map(() => Array(10).fill(\"~\"));\n    this.ships = [];\n    this.shotSound = new Audio(_assets_audio_shot_sound_mp3__WEBPACK_IMPORTED_MODULE_1__);\n    this.hitSound = new Audio(_assets_audio_hit_sound_mp3__WEBPACK_IMPORTED_MODULE_2__);\n    this.missSound = new Audio(_assets_audio_miss_sound_mp3__WEBPACK_IMPORTED_MODULE_3__);\n  }\n  placeShip(ship, startCoord, direction) {\n    const [startX, startY] = startCoord;\n    const shipCoords = [];\n    for (let i = 0; i < ship.length; i++) {\n      const coord = direction === \"horizontal\" ? [startX, startY + i] : [startX + i, startY];\n      shipCoords.push(coord);\n      this.grid[coord[0]][coord[1]] = ship;\n    }\n    ship.setCoordinates(shipCoords);\n    ship.setOrientation(direction);\n    this.ships.push(ship);\n  }\n  receiveAttack(coords) {\n    this.shotSound.play().catch(error => console.error(\"Error playing hit sound:\", error));\n    // Ensure coords is an array with two elements\n    if (!Array.isArray(coords) || coords.length !== 2) {\n      console.error(\"Invalid attack coordinate:\", coords);\n      return false; // Return false if coords are invalid\n    }\n    const [y, x] = coords;\n    const cell = this.grid[y][x];\n    if (cell instanceof _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      // Hit\n      cell.hit([y, x]); // Mark hit on the ship\n      //console.log(cell);\n      //console.log(cell.hit(coords));\n      this.grid[y][x] = \"X\"; // Update grid to reflect the hit\n\n      // Play hit sound\n      setTimeout(() => {\n        this.hitSound.play().catch(error => console.error(\"Error playing hit sound:\", error));\n      }, 1000);\n\n      // Check if the ship is sunk\n      if (cell.isSunk()) {\n        console.log(`${cell.type} has been sunk!`);\n\n        // Change all ship's coordinates to the sunk class\n        cell.getCoordinates().forEach(([coordX, coordY]) => {\n          this.grid[coordX][coordY] = \"SUNK\";\n        });\n        return \"SUNK\";\n      }\n      return true; // Indicate hit\n    } else if (cell === \"~\") {\n      // Miss\n      this.grid[y][x] = \"O\";\n      setTimeout(() => {\n        this.missSound.play().catch(error => console.error(\"Error playing miss sound:\", error));\n      }, 1000);\n      return false; // Indicate miss\n    }\n\n    // If the cell is already marked as \"O\" or \"X\", it's been attacked before.\n    return \"~\"; // Prevent re-attacks\n  }\n  isShipSunk(ship) {\n    // Ensure the ship parameter is a valid instance of Ship\n    if (!(ship instanceof _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n      console.error(\"Invalid ship instance provided to isShipSunk method.\");\n      return false;\n    }\n\n    // Check if all coordinates of the ship have been hit\n    return ship.getCoordinates().every(([x, y]) => this.grid[x][y] === \"X\" || this.grid[x][y] === \"SUNK\");\n  }\n  allShipsSunk() {\n    return this.ships.every(ship => ship.isSunk());\n  }\n  calculateEndCoordinates(startX, startY, length, direction) {\n    let endX = startX;\n    let endY = startY;\n    if (direction === \"horizontal\") {\n      endY = startY + length - 1;\n    } else if (direction === \"vertical\") {\n      endX = startX + length - 1;\n    }\n    return [endX, endY];\n  }\n  printBoard() {\n    /*console.log(\n      this.grid\n        .map((row) => row.map((cell) => (cell ? \"S\" : \"-\")).join(\" \"))\n        .join(\"\\n\")\n    );*/\n  }\n  getShipAt([y, x]) {\n    const cell = this.grid[y][x];\n    return cell instanceof _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] ? cell : null;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxJQUFJLFlBQVlyQyxnREFBSSxHQUFHcUMsSUFBSSxHQUFHLElBQUk7RUFDM0M7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzPzI4YjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHNob3RTb3VuZEZpbGUgZnJvbSBcIi4vYXNzZXRzL2F1ZGlvL3Nob3Qtc291bmQubXAzXCI7XG5pbXBvcnQgaGl0U291bmRGaWxlIGZyb20gXCIuL2Fzc2V0cy9hdWRpby9oaXQtc291bmQubXAzXCI7XG5pbXBvcnQgbWlzc1NvdW5kRmlsZSBmcm9tIFwiLi9hc3NldHMvYXVkaW8vbWlzcy1zb3VuZC5tcDNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkID0gQXJyYXkoMTApXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIn5cIikpO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB0aGlzLnNob3RTb3VuZCA9IG5ldyBBdWRpbyhzaG90U291bmRGaWxlKTtcbiAgICB0aGlzLmhpdFNvdW5kID0gbmV3IEF1ZGlvKGhpdFNvdW5kRmlsZSk7XG4gICAgdGhpcy5taXNzU291bmQgPSBuZXcgQXVkaW8obWlzc1NvdW5kRmlsZSk7XG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSB7XG4gICAgY29uc3QgW3N0YXJ0WCwgc3RhcnRZXSA9IHN0YXJ0Q29vcmQ7XG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb29yZCA9XG4gICAgICAgIGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCJcbiAgICAgICAgICA/IFtzdGFydFgsIHN0YXJ0WSArIGldXG4gICAgICAgICAgOiBbc3RhcnRYICsgaSwgc3RhcnRZXTtcblxuICAgICAgc2hpcENvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgICAgIHRoaXMuZ3JpZFtjb29yZFswXV1bY29vcmRbMV1dID0gc2hpcDtcbiAgICB9XG5cbiAgICBzaGlwLnNldENvb3JkaW5hdGVzKHNoaXBDb29yZHMpO1xuICAgIHNoaXAuc2V0T3JpZW50YXRpb24oZGlyZWN0aW9uKTtcbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xuICAgIHRoaXMuc2hvdFNvdW5kXG4gICAgICAucGxheSgpXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGxheWluZyBoaXQgc291bmQ6XCIsIGVycm9yKSk7XG4gICAgLy8gRW5zdXJlIGNvb3JkcyBpcyBhbiBhcnJheSB3aXRoIHR3byBlbGVtZW50c1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjb29yZHMpIHx8IGNvb3Jkcy5sZW5ndGggIT09IDIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIGF0dGFjayBjb29yZGluYXRlOlwiLCBjb29yZHMpO1xuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBSZXR1cm4gZmFsc2UgaWYgY29vcmRzIGFyZSBpbnZhbGlkXG4gICAgfVxuXG4gICAgY29uc3QgW3ksIHhdID0gY29vcmRzO1xuXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZFt5XVt4XTtcblxuICAgIGlmIChjZWxsIGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgLy8gSGl0XG4gICAgICBjZWxsLmhpdChbeSwgeF0pOyAvLyBNYXJrIGhpdCBvbiB0aGUgc2hpcFxuICAgICAgLy9jb25zb2xlLmxvZyhjZWxsKTtcbiAgICAgIC8vY29uc29sZS5sb2coY2VsbC5oaXQoY29vcmRzKSk7XG4gICAgICB0aGlzLmdyaWRbeV1beF0gPSBcIlhcIjsgLy8gVXBkYXRlIGdyaWQgdG8gcmVmbGVjdCB0aGUgaGl0XG5cbiAgICAgIC8vIFBsYXkgaGl0IHNvdW5kXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oaXRTb3VuZFxuICAgICAgICAgIC5wbGF5KClcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGxheWluZyBoaXQgc291bmQ6XCIsIGVycm9yKSk7XG4gICAgICB9LCAxMDAwKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNoaXAgaXMgc3Vua1xuICAgICAgaWYgKGNlbGwuaXNTdW5rKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y2VsbC50eXBlfSBoYXMgYmVlbiBzdW5rIWApO1xuXG4gICAgICAgIC8vIENoYW5nZSBhbGwgc2hpcCdzIGNvb3JkaW5hdGVzIHRvIHRoZSBzdW5rIGNsYXNzXG4gICAgICAgIGNlbGwuZ2V0Q29vcmRpbmF0ZXMoKS5mb3JFYWNoKChbY29vcmRYLCBjb29yZFldKSA9PiB7XG4gICAgICAgICAgdGhpcy5ncmlkW2Nvb3JkWF1bY29vcmRZXSA9IFwiU1VOS1wiO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gXCJTVU5LXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlOyAvLyBJbmRpY2F0ZSBoaXRcbiAgICB9IGVsc2UgaWYgKGNlbGwgPT09IFwiflwiKSB7XG4gICAgICAvLyBNaXNzXG4gICAgICB0aGlzLmdyaWRbeV1beF0gPSBcIk9cIjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm1pc3NTb3VuZFxuICAgICAgICAgIC5wbGF5KClcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGxheWluZyBtaXNzIHNvdW5kOlwiLCBlcnJvcikpO1xuICAgICAgfSwgMTAwMCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTsgLy8gSW5kaWNhdGUgbWlzc1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBjZWxsIGlzIGFscmVhZHkgbWFya2VkIGFzIFwiT1wiIG9yIFwiWFwiLCBpdCdzIGJlZW4gYXR0YWNrZWQgYmVmb3JlLlxuICAgIHJldHVybiBcIn5cIjsgLy8gUHJldmVudCByZS1hdHRhY2tzXG4gIH1cblxuICBpc1NoaXBTdW5rKHNoaXApIHtcbiAgICAvLyBFbnN1cmUgdGhlIHNoaXAgcGFyYW1ldGVyIGlzIGEgdmFsaWQgaW5zdGFuY2Ugb2YgU2hpcFxuICAgIGlmICghKHNoaXAgaW5zdGFuY2VvZiBTaGlwKSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgc2hpcCBpbnN0YW5jZSBwcm92aWRlZCB0byBpc1NoaXBTdW5rIG1ldGhvZC5cIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGlwIGhhdmUgYmVlbiBoaXRcbiAgICByZXR1cm4gc2hpcFxuICAgICAgLmdldENvb3JkaW5hdGVzKClcbiAgICAgIC5ldmVyeSgoW3gsIHldKSA9PiB0aGlzLmdyaWRbeF1beV0gPT09IFwiWFwiIHx8IHRoaXMuZ3JpZFt4XVt5XSA9PT0gXCJTVU5LXCIpO1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUVuZENvb3JkaW5hdGVzKHN0YXJ0WCwgc3RhcnRZLCBsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgIGxldCBlbmRYID0gc3RhcnRYO1xuICAgIGxldCBlbmRZID0gc3RhcnRZO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIGVuZFkgPSBzdGFydFkgKyBsZW5ndGggLSAxO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGVuZFggPSBzdGFydFggKyBsZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHJldHVybiBbZW5kWCwgZW5kWV07XG4gIH1cblxuICBwcmludEJvYXJkKCkge1xuICAgIC8qY29uc29sZS5sb2coXG4gICAgICB0aGlzLmdyaWRcbiAgICAgICAgLm1hcCgocm93KSA9PiByb3cubWFwKChjZWxsKSA9PiAoY2VsbCA/IFwiU1wiIDogXCItXCIpKS5qb2luKFwiIFwiKSlcbiAgICAgICAgLmpvaW4oXCJcXG5cIilcbiAgICApOyovXG4gIH1cblxuICBnZXRTaGlwQXQoW3ksIHhdKSB7XG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZFt5XVt4XTtcbiAgICByZXR1cm4gY2VsbCBpbnN0YW5jZW9mIFNoaXAgPyBjZWxsIDogbnVsbDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNoaXAiLCJzaG90U291bmRGaWxlIiwiaGl0U291bmRGaWxlIiwibWlzc1NvdW5kRmlsZSIsIkdhbWVCb2FyZCIsImNvbnN0cnVjdG9yIiwiZ3JpZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsInNoaXBzIiwic2hvdFNvdW5kIiwiQXVkaW8iLCJoaXRTb3VuZCIsIm1pc3NTb3VuZCIsInBsYWNlU2hpcCIsInNoaXAiLCJzdGFydENvb3JkIiwiZGlyZWN0aW9uIiwic3RhcnRYIiwic3RhcnRZIiwic2hpcENvb3JkcyIsImkiLCJsZW5ndGgiLCJjb29yZCIsInB1c2giLCJzZXRDb29yZGluYXRlcyIsInNldE9yaWVudGF0aW9uIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkcyIsInBsYXkiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImlzQXJyYXkiLCJ5IiwieCIsImNlbGwiLCJoaXQiLCJzZXRUaW1lb3V0IiwiaXNTdW5rIiwibG9nIiwidHlwZSIsImdldENvb3JkaW5hdGVzIiwiZm9yRWFjaCIsImNvb3JkWCIsImNvb3JkWSIsImlzU2hpcFN1bmsiLCJldmVyeSIsImFsbFNoaXBzU3VuayIsImNhbGN1bGF0ZUVuZENvb3JkaW5hdGVzIiwiZW5kWCIsImVuZFkiLCJwcmludEJvYXJkIiwiZ2V0U2hpcEF0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/gameBoard.js\n");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length, type = \"unknown\", orientation = \"horizontal\") {\n    this.length = length;\n    this.hits = 0;\n    this.type = type;\n    this.coordinates = [];\n    this.orientation = orientation;\n  }\n  hit() {\n    this.hits++;\n  }\n  isSunk() {\n    return this.hits >= this.length;\n  }\n  setCoordinates(coords) {\n    this.coordinates = coords;\n  }\n  getCoordinates() {\n    return this.coordinates;\n  }\n  setOrientation(orientation) {\n    this.orientation = orientation;\n  }\n  getOrientation() {\n    return this.orientation;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hpcC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsTUFBTUEsSUFBSSxDQUFDO0VBQ3hCQyxXQUFXQSxDQUFDQyxNQUFNLEVBQUVDLElBQUksR0FBRyxTQUFTLEVBQUVDLFdBQVcsR0FBRyxZQUFZLEVBQUU7SUFDaEUsSUFBSSxDQUFDRixNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDRyxJQUFJLEdBQUcsQ0FBQztJQUNiLElBQUksQ0FBQ0YsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCLElBQUksQ0FBQ0csV0FBVyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDRixXQUFXLEdBQUdBLFdBQVc7RUFDaEM7RUFFQUcsR0FBR0EsQ0FBQSxFQUFHO0lBQ0osSUFBSSxDQUFDRixJQUFJLEVBQUU7RUFDYjtFQUVBRyxNQUFNQSxDQUFBLEVBQUc7SUFDUCxPQUFPLElBQUksQ0FBQ0gsSUFBSSxJQUFJLElBQUksQ0FBQ0gsTUFBTTtFQUNqQztFQUVBTyxjQUFjQSxDQUFDQyxNQUFNLEVBQUU7SUFDckIsSUFBSSxDQUFDSixXQUFXLEdBQUdJLE1BQU07RUFDM0I7RUFFQUMsY0FBY0EsQ0FBQSxFQUFHO0lBQ2YsT0FBTyxJQUFJLENBQUNMLFdBQVc7RUFDekI7RUFFQU0sY0FBY0EsQ0FBQ1IsV0FBVyxFQUFFO0lBQzFCLElBQUksQ0FBQ0EsV0FBVyxHQUFHQSxXQUFXO0VBQ2hDO0VBRUFTLGNBQWNBLENBQUEsRUFBRztJQUNmLE9BQU8sSUFBSSxDQUFDVCxXQUFXO0VBQ3pCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanM/ZDAzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCB0eXBlID0gXCJ1bmtub3duXCIsIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCIpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMrKztcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG5cbiAgc2V0Q29vcmRpbmF0ZXMoY29vcmRzKSB7XG4gICAgdGhpcy5jb29yZGluYXRlcyA9IGNvb3JkcztcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiB0aGlzLmNvb3JkaW5hdGVzO1xuICB9XG5cbiAgc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gIH1cblxuICBnZXRPcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNoaXAiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsInR5cGUiLCJvcmllbnRhdGlvbiIsImhpdHMiLCJjb29yZGluYXRlcyIsImhpdCIsImlzU3VuayIsInNldENvb3JkaW5hdGVzIiwiY29vcmRzIiwiZ2V0Q29vcmRpbmF0ZXMiLCJzZXRPcmllbnRhdGlvbiIsImdldE9yaWVudGF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/ship.js\n");

/***/ }),

/***/ "./src/assets/audio/hit-sound.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/hit-sound.mp3 ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "96a50b265841ced7c235.mp3";

/***/ }),

/***/ "./src/assets/audio/miss-sound.mp3":
/*!*****************************************!*\
  !*** ./src/assets/audio/miss-sound.mp3 ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "058afc203bb520b90d96.mp3";

/***/ }),

/***/ "./src/assets/audio/shot-sound.mp3":
/*!*****************************************!*\
  !*** ./src/assets/audio/shot-sound.mp3 ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e38f594694469ba3b826.mp3";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameBoard.js"));
/******/ }
]);