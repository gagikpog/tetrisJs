import { Block } from "./block.js";
import { RotateType } from "./constants.js";
import { Display } from "./display.js";
import { copyToMap, canMove, rotate, getRandomBlock, clearFullRows, getLevel } from './functions.js';

export class Game {

    /** @private @type { number } */
    _width;

    /**  @private @type { number } */
    _height;

    /** @type { number } */
    level = 1;

    /** @private @type { Display } */
    _display;

    /** @private @type { boolean[][] } */
    _map;

    /** @private @type { Block } */
    _block;

    /** @private @type { number } */
    _clearedRowsCount = 0;

    /** @private @type { number } */
    _points = 0;

    /** @private @type { Block } */
    _nextBlock = new Block(getRandomBlock());

    /**
     * @param {{ display: Display, width?: number, height?: number }} options
     */
    constructor(options) {
        const { width = 10, height = 20, display, state } = options;
        this._width = width;
        this._height = height;
        this._display = display;

        if (state) {
            this._applyState(state);
        } else{
            this.newGame();
        }
    }

    getState() {
        return {
            width: this._width,
            height: this._height,
            map: this._map,
            block: this._block.getState(),
            nextBlock: this._nextBlock.getState(),
            points: this._points,
            clearedRowsCount: this._clearedRowsCount,
            level: this.level
        };
    }

    /**
     * @private
     * @param {*} state
     */
    _applyState(state) {
        this._width = state.width ?? this._width;
        this._height = state.height ?? this._height;
        this.level = state.level ?? this.level;
        this._map = state.map ?? this._map;
        this._clearedRowsCount = state.clearedRowsCount;
        this._points = state.points ?? this._points;
        this._block = new Block(null, state.block);
        this._nextBlock = new Block(null, state.nextBlock);
    }

    /**
     * 
     * @param {Function} callback 
     */
    setGameOverCallback(callback) {
        this._gameOverCallback = callback;
    }

    /**
     * @private
     */
    _addBlock() {
        this._block = this._nextBlock;
        this._nextBlock = new Block(getRandomBlock());
        const move = canMove(this._map, this._block.getMap(), this._block.x, this._block.y);
        if (!move) {
            // game over
            if (this._gameOverCallback) {
                this._gameOverCallback()
            }
        }
    }

    /**
     * 
     * @param { number } offsetX
     * @param { number } offsetY
     */
    _moveBlock(offsetX, offsetY) {
        if (!this.moveBlock(offsetX, offsetY)) {
            copyToMap(this._map, this._block);
            this._addBlock();
            this._updateMenu();
        }
    }

    /**
     * @param {number} removedCount 
     */
    _updateScore(removedCount) {
        this._clearedRowsCount += removedCount;
        this._points += {
            1: 40,
            2: 100,
            3: 300,
            4: 2400
        }[removedCount] || 0;
    }

    /**
     * @private
     */
    _updateMenu() {
        const time = this.getTime();
        this.level = getLevel(time);
        this._display.updateMenu({
            points: this._points,
            cleans: this._clearedRowsCount,
            level: this.level,
            block: this._nextBlock,
            time
        });
    }

    newGame() {
        this._map = Array(this._height).fill(null).map(() => Array(this._width).fill(false));
        this.level = 1;
        this._clearedRowsCount = 0;
        this._points = 0;
        this._block = new Block(getRandomBlock());
        this._nextBlock = new Block(getRandomBlock());
    }

    setTimeCallback(callback) {
        this.getTime = callback;
    }

    getTime() {
        return 0;
    }

    /**
     * @param { number } width
     * @param { number } height
     */
    setSize(width, height) {
        this._display.setSize(width, height);
    }

    step() {
        if (this._block) {
            this._moveBlock(0, 1);
        } else {
            this._addBlock();
            this._updateMenu();
        }

        const removedCount = clearFullRows(this._map);
        if (removedCount) {
            this._updateScore(removedCount);
            this._updateMenu();
        }

        this.redraw();
    }

    redraw() {
        this._display.clear();
        this._display.draw(this._map, this._block || this._nextBlock);
        this._updateMenu();
    }

    /**
     * 
     * @param { number } offsetX
     * @param { number } offsetY
     */
    moveBlock(offsetX, offsetY) {
        const newX = this._block.x + offsetX;
        const newY = this._block.y + offsetY;
        const move = canMove(this._map, this._block.getMap(), newX, newY);
        if (move) {
            this._block.moveTo(newX, newY);
        }
        return move;
    }

    rotate() {
        let newMap = null;
        switch(this._block.rotate) {

            case RotateType.none:
                break;
            case RotateType.clockwiseBack:
                newMap = rotate(this._block.getMap(), !this._block.isRotated)
                break;
            case RotateType.full:
                newMap = rotate(this._block.getMap());
                break;
        }

        if (newMap && canMove(this._map, newMap, this._block.x, this._block.y)) {
            this._block.setMap(newMap);
            this._block.isRotated = !this._block.isRotated;
        }
    }

    moveDown() {
        let move = false;
        do {
            move = canMove(this._map, this._block.getMap(), this._block.x, this._block.y + 1);
            if (move) {
                this._block.moveTo(this._block.x, this._block.y + 1);
            }
        } while (move);
    }

}
