import { Display } from "./src/display.js";
import { Engine } from "./src/engine.js";
import { Game } from "./src/game.js";

const canvas = document.querySelector('#display');
const backing = document.querySelector('#backing');
const blockDisplay = document.querySelector('#block-display');
const blockDisplayBackground = document.querySelector('#block-display-background');

const ctx = canvas?.getContext('2d');
const backingCtx = backing?.getContext('2d');
const blockCtx = blockDisplay?.getContext('2d');
const blockBackCtx = blockDisplayBackground?.getContext('2d');

const display = new Display({ ctx, backingCtx, blockCtx, blockBackCtx });

const game = new Game({display});
const engine = new Engine({game});
engine.run();
