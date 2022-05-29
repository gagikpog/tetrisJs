
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

        this._resizeHandler = this._resizeHandler.bind(this);
        window.addEventListener('resize', this._resizeHandler, true);

        this._game.setGameOverCallback(() => {
            this.stop();
        });

        this._resizeHandler();
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
                if (this._isRunning) {
                    this._game.rotate();
                    this._game.redraw();
                }
                break;
            case 'ArrowDown':
                if (this._isRunning) {
                    this._game.moveBlock(0, 1);
                    this._game.redraw();
                }
                break;
            case 'ArrowLeft':
                if (this._isRunning) {
                    this._game.moveBlock(-1, 0);
                    this._game.redraw();
                }
                break;
            case 'ArrowRight':
                if (this._isRunning) {
                    this._game.moveBlock(1, 0);
                    this._game.redraw();
                }
                break;
            case 'Space':
                if (this._isRunning) {
                    this._game.moveDown();
                    this._game.redraw();
                }
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

    /**
     * @private
     * @returns {{ width: number, height: number }}
     */
    _getDisplaySize() {
        const height = window.innerHeight - 10;
        const width = height * 0.5;
        return { width, height };
    }

    /**
     * @private
     */
    _resizeHandler() {
        const { width, height } = this._getDisplaySize()
        this._game.setSize(width, height);
        this._game.redraw();
    }

}