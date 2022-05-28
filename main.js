import { Display } from "./src/display.js";
import { Engine } from "./src/engine.js";
import { Game } from "./src/game.js";

const canvas = document.querySelector('#display');
canvas.height = window.innerHeight - 10;
canvas.width = canvas.height * 0.75;
const ctx = canvas?.getContext('2d');

const display = new Display(ctx);
const game = new Game({display});
const engine = new Engine({game});
engine.run();
