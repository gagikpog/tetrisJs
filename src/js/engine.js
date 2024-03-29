
import { showGameOverDialog, showPauseDialog } from "./dialogs.js";
import { getInterval, isTouchDevice } from "./functions.js";
import { Game } from "./game.js";
import { saveState } from "./state.js";
import { Swipe } from "./swipe.js";

export class Engine {

    /** @private @type { number } */
    _intervalIndex;

    /** @private @type { number } */
    _timeoutIndex;

    /** @private @type { boolean } */
    _isRunning;

    /** @private @type { boolean } */
    _isGameOver = false;

    /** @private @type { Game } */
    _game;

    /** @private @type { number } */
    _time = 0;

    /**
     * @param {{ game: Game }} options
     */
    constructor(options) {
        const { game, state } = options;
        this._game = game;
        if (state) {
            this._applyState(state);
        }

        if (isTouchDevice()) {
            const swipe = new Swipe('#display');
            swipe
                .onLeft(() => this._runCommand('ArrowLeft'))
                .onRight(() => this._runCommand('ArrowRight'))
                .onDown(() => this._runCommand('Space'))
                .onTouch(() => this._runCommand('ArrowUp'));

        } else {
            this._keyPressHandler = this._keyPressHandler.bind(this);
            document.addEventListener('keydown', this._keyPressHandler);
        }

        this._resizeHandler = this._resizeHandler.bind(this);
        window.addEventListener('resize', this._resizeHandler, true);

        this._game.setGameOverCallback(() => {
            this.stop();
            this._isGameOver = true;
            showGameOverDialog().then((command) => this._runCommand(command));
        });

        this._game.setTimeCallback(() => this._time);

        this._pauseBtn = document.querySelector('#btn-pause');

        this._pauseBtn?.addEventListener('click', () => {
            this._runCommand('pause');
        });

        const volumeBtn = document.querySelector('#btn-volume');
        volumeBtn?.addEventListener('click', () => {
            if (volumeBtn.innerHTML === 'volume_up') {
                volumeBtn.innerHTML = 'volume_off';
            } else {
                volumeBtn.innerHTML = 'volume_up';
            }
        });

        this._resizeHandler();
    }

    getState() {
        return {
            game: this._game.getState(),
            time: this._time,
            isRunning: this._isRunning,
            isGameOver: this._isGameOver
        };
    }

    /**
     * @private
     * @param {*} state
     */
    _applyState(state) {
        this._time = state.time ?? this._time;
        this._isGameOver = state.isGameOver ?? this._isGameOver;
        this._loadFromState = true;
        this._isRunning = true;
    }

    run() {
        if (this._loadFromState) {
            this._loadFromState = false;
            this._runCommand('pause');
        } else {
            if (!this._isRunning) {
                this._isRunning = true;
                this._intervalIndex = setInterval(() => {
                    this._time++;
                }, 1000);
                this._step();
            }
        }
    }

    stop() {
        clearInterval(this._intervalIndex);
        clearTimeout(this._timeoutIndex);
        this._isRunning = false;
    }

    _step() {
        this._game.step();
        saveState(this.getState());
        const interval = getInterval(this._game.level);
        this._timeoutIndex = setTimeout(() => {
            if (this._isRunning) {
                this._step();
            }
        }, interval);
    }

    /**
     * 
     * @param { KeyboardEvent } event
     */
    _keyPressHandler(event) {
        this._runCommand(event.code);
    }

    /**
     * @param { string } command
     */
    _runCommand(command) {
        switch(command) {
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
            case 'pause':
            case 'KeyP':
                if (this._isRunning) {
                    this.stop();
                    this._pauseBtn.innerHTML = 'play_arrow';
                    if (this._isGameOver) {
                        showGameOverDialog().then((command) => this._runCommand(command));
                    } else {
                        showPauseDialog().then((command) => this._runCommand(command));
                    }
                } else {
                    if (!this._isGameOver) {
                        this.run();
                        this._pauseBtn.innerHTML = 'pause';
                    }
                }
                this._game.redraw();
                break;
            case 'KeyN':
            case 'newGame':
                this._time = 0;
                this._isGameOver = false;
                this._game.newGame()
                this._game.redraw();
                this.run();
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

        const gameNode = document.body;
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