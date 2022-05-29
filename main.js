import { Display } from "./src/display.js";
import { Engine } from "./src/engine.js";
import { Game } from "./src/game.js";

const canvas = document.querySelector('#display');
const backing = document.querySelector('#backing');

const ctx = canvas?.getContext('2d');
const backingCtx = backing?.getContext('2d');

const display = new Display(ctx, backingCtx);

const game = new Game({display});
const engine = new Engine({game});
engine.run();
