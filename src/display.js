import { Block } from "./block.js";
import { drawItem } from './functions.js'

export class Display {

    /** @private @type { CanvasRenderingContext2D } */
    _ctx;

    /**
     * @param { CanvasRenderingContext2D } ctx 
     */
    constructor(ctx) {
        this._ctx = ctx;
    }

    /**
     * @param { boolean[][] } map
     * @param { Block } block
     */
    draw(map, block) {
        const size = (this._ctx.canvas.height - map.length) / map.length ;
        this._ctx.lineWidth = 4;
        this._ctx.fillStyle = '#8b9876';
        this._ctx.strokeStyle = '#8b9876';
        this._drawMap(map, size, false);
        this._ctx.fillStyle = '#000';
        this._ctx.strokeStyle = '#000';
        this._drawMap(map, size, true);
        if (block) {
            this._drawBlock(block, size);
        }
    }

    clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    /**
     * @param { boolean[][]}  map
     * @param { number} size
     * @param { boolean} visible
     * @param { number} offsetX
     * @param { number} offsetY
     * @private
     */
    _drawMap(map, size, visible, offsetX = 0, offsetY = 0) {
        map.forEach((row, y) => {
            row.forEach((item, x) => {
                if (item === visible) {
                    drawItem(this._ctx, offsetX + x * size + x, offsetY + y * size + y, size);
                }
            });
        });
    }

    /**
     * @private
     * @param { Block } block
     * @param { number } size
     */
    _drawBlock(block, size) {
        this._drawMap(block.getMap(), size, true, block.x * size + block.x, block.y * size + block.y);
    }
}
