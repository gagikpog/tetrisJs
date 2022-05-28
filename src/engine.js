
import { Game } from "./game.js";

export class Engine {

    /** @private @type { number } */
    _intervalIndex;

    /** @private @type { boolean } */
    _isRunning;

    /** @private @type { Game } */
    _game;

    /**
     * @param {{ game: Game }} options
     */
    constructor(options) {
        const { game } = options;
        this._game = game;

        this._keyPressHandler = this._keyPressHandler.bind(this);
        document.addEventListener('keydown', this._keyPressHandler)
    }

    run() {
        if (!this._isRunning) {
            this._isRunning = true;
            this._intervalIndex = setInterval(() => {
                this._step();
            }, 500);
        }
    }

    stop() {
        clearInterval(this._intervalIndex);
        this._isRunning = false;
    }

    _step() {
        this._game.step();
    }

    /**
     * 
     * @param { KeyboardEvent } event
     */
    _keyPressHandler(event) {

        switch(event.code) {
            case 'ArrowUp':
                this._game.rotate();
                this._game.redraw();
                break;
            case 'ArrowDown':
                this._game.moveBlock(0, 1);
                this._game.redraw();
                break;
            case 'ArrowLeft':
                this._game.moveBlock(-1, 0);
                this._game.redraw();
                break;
            case 'ArrowRight':
                this._game.moveBlock(1, 0);
                this._game.redraw();
                break;
            case 'Space':
                this._game.moveDown();
                this._game.redraw();
                break;
            case 'KeyP':
                if (this._isRunning) {
                    this.stop();
                } else {
                    this.run();
                }
                this._game.redraw();
                break;
        }
    }

}