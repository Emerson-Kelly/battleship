import "./styles.css";
import GameBoardController from "./gameController";
import Player from "./player";




export let gameController;
gameController = new GameBoardController();

export const player = new Player(true);
export const opponent = new Player(false);

gameController.initializeGame();
gameController.startGame();


