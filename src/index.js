import '@/styles/index.scss';
import { Display } from "./js/display.js";
import { Engine } from "./js/engine.js";
import { Game } from "./js/game.js";
import { loadState } from './js/state.js';

const canvas = document.querySelector('#display');
const backing = document.querySelector('#backing');
const blockDisplay = document.querySelector('#block-display');
const blockDisplayBackground = document.querySelector('#block-display-background');

const ctx = canvas?.getContext('2d');
const backingCtx = backing?.getContext('2d');
const blockCtx = blockDisplay?.getContext('2d');
const blockBackCtx = blockDisplayBackground?.getContext('2d');

const state = loadState();

const display = new Display({ ctx, backingCtx, blockCtx, blockBackCtx });

const game = new Game({ display, state: state?.game });
const engine = new Engine({ game, state });
engine.run();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
