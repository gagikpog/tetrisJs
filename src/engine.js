
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
     * @returns {{ width: number, height: number, mobileView: boolean }}
     */
    _getDisplaySize() {

        const mobileView = window.innerHeight > window.innerWidth * 1.5;

        const offset = 20;
        const baseHeight = (window.innerHeight - offset - (mobileView ? 110 : 0)) / 20;
        const baseWidth = (window.innerWidth - offset) / 10;

        const size = Math.min(baseHeight, baseWidth);

        const height = size * 20;
        const width = size * 10;

        return { width, height, mobileView };
    }

    /**
     * @private
     */
    _resizeHandler() {
        const { width, height, mobileView } = this._getDisplaySize();

        const gameNode = document.querySelector('.game');
        const hasClass = gameNode?.classList.contains('mobile');

        if (!hasClass && mobileView) {
            gameNode?.classList.add('mobile');
        } else if (hasClass && !mobileView) {
            gameNode?.classList.remove('mobile');
        }

        this._game.setSize(width, height);
        this._game.redraw();
    }

}