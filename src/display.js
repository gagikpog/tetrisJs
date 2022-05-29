import { Block } from "./block.js";
import { drawItem } from './functions.js'

export class Display {

    /** @private @type { CanvasRenderingContext2D } */
    _ctx;

    /** @private @type { CanvasRenderingContext2D } */
    _backingCtx;

    /** @private @type { CanvasRenderingContext2D } */
    _blockCtx;

    /** @private @type { CanvasRenderingContext2D } */
    _blockBackCtx;

    /** @private @type { { points: HTMLElement | null, cleans: HTMLElement | null, level: HTMLElement | null } } */
    _fields;

    /**
     * @param {{ctx: CanvasRenderingContext2D, backingCtx: CanvasRenderingContext2D, blockCtx: CanvasRenderingContext2D, blockBackCtx: CanvasRenderingContext2D}} param0
     */
    constructor({ctx, backingCtx, blockCtx, blockBackCtx}) {
        this._ctx = ctx;
        this._backingCtx = backingCtx;
        this._blockCtx = blockCtx;
        this._blockBackCtx = blockBackCtx;

        this._fields = {
            points: document.querySelector('#points'),
            cleans: document.querySelector('#cleans'),
            level: document.querySelector('#level')
        };
    }

    /**
     * @param { boolean[][] } map
     * @param { Block } block
     */
    draw(map, block) {
        const size = (this._ctx.canvas.height - map.length) / map.length;
        this._initStyles();
        this._drawBackground(map, block.getMap(), size);
        this._drawMap(this._ctx, map, size, true);
        this._drawBlock(block, size);
    }

    clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    /**
     * @param { number } width
     * @param { number } height
     */
    setSize(width, height) {
        this._ctx.canvas.height = height;
        this._ctx.canvas.width = width;
        this._backingCtx.canvas.height = height;
        this._backingCtx.canvas.width = width;

        const size = (this._ctx.canvas.height - 20) / 20;
        this._blockCtx.canvas.width = size * 5;
        this._blockCtx.canvas.height = size * 2;
        this._blockBackCtx.canvas.width = size * 5;
        this._blockBackCtx.canvas.height = size * 2;
    }

    /**
     * @param { CanvasRenderingContext2D } ctx
     * @param { boolean[][] } map
     * @param { number } size
     * @param { boolean } visible
     * @param { number } offsetX
     * @param { number } offsetY
     * @param { boolean } drawAll
     * @private
     */
    _drawMap(ctx, map, size, visible, offsetX = 0, offsetY = 0, drawAll = false) {
        map.forEach((row, y) => {
            row.forEach((item, x) => {
                if (drawAll || item === visible) {
                    drawItem(ctx, offsetX + x * size + x + 2, offsetY + y * size + y + 2, size);
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
        this._drawMap(this._ctx, block.getMap(), size, true, block.x * size + block.x, block.y * size + block.y);
    }

    /**
     * @param { boolean[][] } map
     * @param { boolean[][] } block
     * @param { number } size
     */
    _drawBackground(map, block, size) {
        this._drawMap(this._backingCtx, map, size, true, 0, 0, true);
        this._drawMap(this._blockBackCtx, block, size, true, 0, 0, true);
    }

    _initStyles() {

        this._ctx.lineWidth = 4;
        this._ctx.fillStyle = '#000';
        this._ctx.strokeStyle = '#000';

        this._blockCtx.lineWidth = 4;
        this._blockCtx.fillStyle = '#000';
        this._blockCtx.strokeStyle = '#000';

        this._backingCtx.lineWidth = 4;
        this._backingCtx.fillStyle = '#8b9876';
        this._backingCtx.strokeStyle = '#8b9876';

        this._blockBackCtx.lineWidth = 4;
        this._blockBackCtx.fillStyle = '#8b9876';
        this._blockBackCtx.strokeStyle = '#8b9876';
    }

    /**
     * @param { {points: number, cleans: number, level: number, block: Block} } data
     */
    updateMenu(data) {
        if (this._fields.points) {
            this._fields.points.innerText = `${data.points}`;
        }
        if (this._fields.cleans) {
            this._fields.cleans.innerText = `${data.cleans}`;
        }
        if (this._fields.level) {
            this._fields.level.innerText = `${data.level}`;
        }

        if (this._blockCtx && data.block) {
            const size = this._blockCtx.canvas.height / 2;
            this._blockCtx.clearRect(0, 0, this._blockCtx.canvas.width, this._blockCtx.canvas.height);
            this._drawMap(this._blockCtx, data.block.getMap(), size, true, 0, data.block.y * size);
        }
    }
}
