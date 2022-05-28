import { blocksMap, BlocksType } from './constants.js';

export class Block {

    /** @private @type { boolean[][] } */
    _map;

    /** @type { boolean } */
    isRotated;

    /** @type { string } */
    rotate;

    /**
     * 
     * @param {keyof BlocksType} item 
     */
    constructor(item) {
        const block = blocksMap[item];
        this.x = block.x;
        this.y = block.y;
        this._map = block.map;
        this.rotate = block.rotate;
        this.isRotated = block.isRotated;
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
}
