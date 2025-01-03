"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["ship"],{

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length, type = \"unknown\", orientation = \"horizontal\") {\n    this.length = length;\n    this.hits = 0;\n    this.type = type;\n    this.coordinates = [];\n    this.orientation = orientation;\n  }\n  hit() {\n    this.hits++;\n  }\n  isSunk() {\n    return this.hits >= this.length;\n  }\n  setCoordinates(coords) {\n    this.coordinates = coords;\n  }\n  getCoordinates() {\n    return this.coordinates;\n  }\n  setOrientation(orientation) {\n    this.orientation = orientation;\n  }\n  getOrientation() {\n    return this.orientation;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hpcC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsTUFBTUEsSUFBSSxDQUFDO0VBQ3hCQyxXQUFXQSxDQUFDQyxNQUFNLEVBQUVDLElBQUksR0FBRyxTQUFTLEVBQUVDLFdBQVcsR0FBRyxZQUFZLEVBQUU7SUFDaEUsSUFBSSxDQUFDRixNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDRyxJQUFJLEdBQUcsQ0FBQztJQUNiLElBQUksQ0FBQ0YsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCLElBQUksQ0FBQ0csV0FBVyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDRixXQUFXLEdBQUdBLFdBQVc7RUFDaEM7RUFFQUcsR0FBR0EsQ0FBQSxFQUFHO0lBQ0osSUFBSSxDQUFDRixJQUFJLEVBQUU7RUFDYjtFQUVBRyxNQUFNQSxDQUFBLEVBQUc7SUFDUCxPQUFPLElBQUksQ0FBQ0gsSUFBSSxJQUFJLElBQUksQ0FBQ0gsTUFBTTtFQUNqQztFQUVBTyxjQUFjQSxDQUFDQyxNQUFNLEVBQUU7SUFDckIsSUFBSSxDQUFDSixXQUFXLEdBQUdJLE1BQU07RUFDM0I7RUFFQUMsY0FBY0EsQ0FBQSxFQUFHO0lBQ2YsT0FBTyxJQUFJLENBQUNMLFdBQVc7RUFDekI7RUFFQU0sY0FBY0EsQ0FBQ1IsV0FBVyxFQUFFO0lBQzFCLElBQUksQ0FBQ0EsV0FBVyxHQUFHQSxXQUFXO0VBQ2hDO0VBRUFTLGNBQWNBLENBQUEsRUFBRztJQUNmLE9BQU8sSUFBSSxDQUFDVCxXQUFXO0VBQ3pCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanM/ZDAzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCB0eXBlID0gXCJ1bmtub3duXCIsIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCIpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMrKztcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG5cbiAgc2V0Q29vcmRpbmF0ZXMoY29vcmRzKSB7XG4gICAgdGhpcy5jb29yZGluYXRlcyA9IGNvb3JkcztcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiB0aGlzLmNvb3JkaW5hdGVzO1xuICB9XG5cbiAgc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gIH1cblxuICBnZXRPcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNoaXAiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsInR5cGUiLCJvcmllbnRhdGlvbiIsImhpdHMiLCJjb29yZGluYXRlcyIsImhpdCIsImlzU3VuayIsInNldENvb3JkaW5hdGVzIiwiY29vcmRzIiwiZ2V0Q29vcmRpbmF0ZXMiLCJzZXRPcmllbnRhdGlvbiIsImdldE9yaWVudGF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/ship.js\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/ship.js"));
/******/ }
]);