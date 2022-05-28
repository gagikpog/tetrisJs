import { Display } from "./src/display.js";
import { Game } from "./src/game.js";

const canvas = document.querySelector('#display');
const ctx = canvas?.getContext('2d');

const display = new Display(ctx);
const game = new Game();
