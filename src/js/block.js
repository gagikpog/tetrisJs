import { blocksMap, BlocksType } from './constants.js';

export class Block {

    /** @private @type { boolean[][] } */
    _map;

    /** @type { boolean } */
    isRotated;

    /** @type { string } */
    rotate;

    /** @type { number } */
    x;

    /** @type { number } */
    y;

    /**
     * @param {keyof BlocksType} item 
     */
    constructor(item, state) {
        if (state) {
            this._map = state.map,
            this.isRotated = state.isRotated,
            this.rotate = state.rotate,
            this.x = state.x,
            this.y = state.y
        } else {
            const block = blocksMap[item];
            this.x = block.x;
            this.y = block.y;
            this._map = block.map;
            this.rotate = block.rotate;
            this.isRotated = block.isRotated;
        }
    }

    /**
     * @returns { boolean[][] }
     */
    getMap() {
        return this._map;
    }

    /**
     * @param { boolean[][] } newMap
     */
    setMap(newMap) {
        this._map = newMap;
    }

    /**
     * @param { number } x
     * @param { number } y
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    getState() {
        return {
            map: this._map,
            isRotated: this.isRotated,
            rotate: this.rotate,
            x: this.x,
            y: this.y
        };
    }
}
