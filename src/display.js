import { Block } from "./block.js";
import { drawItem } from './functions.js'

export class Display {

    /** @private @type { CanvasRenderingContext2D } */
    _ctx;

    /** @private @type { CanvasRenderingContext2D } */
    _backingCtx;

    /**
     * @param { CanvasRenderingContext2D } ctx 
     * @param { CanvasRenderingContext2D } backingCtx
     */
    constructor(ctx, backingCtx) {
        this._ctx = ctx;
        this._backingCtx = backingCtx;
    }

    /**
     * @param { boolean[][] } map
     * @param { Block } block
     */
    draw(map, block) {
        const size = (this._ctx.canvas.height - map.length) / map.length ;
        this._ctx.lineWidth = 4;
        this._ctx.fillStyle = '#000';
        this._ctx.strokeStyle = '#000';
        this._drawBackground(map, size);
        this._drawMap(map, size, true);
        if (block) {
            this._drawBlock(block, size);
        }
    }

    clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    /**
     * 
     * @param { number } width
     * @param { number } height
     */
    setSize(width, height) {
        this._ctx.canvas.height = height;
        this._ctx.canvas.width = width;
        this._backingCtx.canvas.height = height;
        this._backingCtx.canvas.width = width;
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
                    drawItem(this._ctx, offsetX + x * size + x + 2, offsetY + y * size + y + 2, size);
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

    /**
     * @param { boolean[][] } map
     * @param { number } size
     */
    _drawBackground(map, size) {
        this._backingCtx.lineWidth = 4;
        this._backingCtx.fillStyle = '#8b9876';
        this._backingCtx.strokeStyle = '#8b9876';

        map.forEach((row, y) => {
            row.forEach((item, x) => {
                drawItem(this._backingCtx, x * size + x + 2, y * size + y + 2, size);
            });
        });
    }
}
