import { Block } from "./block.js";
import { RotateType } from "./constants.js";
import { Display } from "./display.js";
import { copyToMap, canMove, rotate, getRandomBlock, clearFullRows } from './functions.js';

export class Game {

    /** @private @type { Display } */
    _display;

    /** @private @type { boolean[][] } */
    _map;

    /** @private @type { Block } */
    _block;

    /** @private @type { number } */
    _clearedRowsCount = 0;

    /**
     * @param {{ display: Display, width?: number, height?: number }} options
     */
    constructor(options) {
        const { width = 10, height = 20, display } = options;
        this._display = display;
        this._map = Array(height).fill(null).map(() => Array(width).fill(false));
    }

    /**
     * @private
     */
    _addBlock() {
        this._block = new Block(getRandomBlock());
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
        }
    }

    step() {
        if (this._block) {
            this._moveBlock(0, 1);
        } else {
            this._addBlock();
        }
        this._clearedRowsCount += clearFullRows(this._map);

        this.redraw();
    }

    redraw() {
        this._display.clear();
        this._display.draw(this._map, this._block);
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
