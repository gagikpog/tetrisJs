import { Block } from "./block.js";
import { drawItem } from './functions.js'

export class Display {

    // Drawing coordinates stay in CSS pixels; canvas buffers use device pixels.
    _width = 0;
    _height = 0;
    _previewWidth = 0;
    _previewHeight = 0;

    /** @private @type { CanvasRenderingContext2D } */
    _ctx;

    /** @private @type { CanvasRenderingContext2D } */
    _backingCtx;

    /** @private @type { CanvasRenderingContext2D } */
    _blockCtx;

    /** @private @type { CanvasRenderingContext2D } */
    _blockBackCtx;

    /** @private @type { { points: HTMLElement | null, cleans: HTMLElement | null, level: HTMLElement | null, time: HTMLElement | null } } */
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
            level: document.querySelector('#level'),
            time: document.querySelector('#game-time')
        };
    }

    /**
     * @param { boolean[][] } map
     * @param { Block } block
     */
    draw(map, block) {
        const size = (this._height - map.length) / map.length;
        this._initStyles(size);
        this._drawBackground(map, block.getMap(), size);
        this._drawMap(this._ctx, map, size, true);
        this._drawBlock(block, size);
    }

    clear() {
        this._ctx.clearRect(0, 0, this._width, this._height);
    }

    /**
     * @param { number } width
     * @param { number } height
     */
    setSize(width, height) {
        this._width = width;
        this._height = height;

        const size = (height - 20) / 20;
        this._previewWidth = size * 5;
        this._previewHeight = size * 2;

        const pixelRatio = window.devicePixelRatio || 1;
        this._resizeCanvas(this._ctx, width, height, pixelRatio);
        this._resizeCanvas(this._backingCtx, width, height, pixelRatio);
        this._resizeCanvas(this._blockCtx, this._previewWidth, this._previewHeight, pixelRatio);
        this._resizeCanvas(this._blockBackCtx, this._previewWidth, this._previewHeight, pixelRatio);
    }

    /** @private */
    _resizeCanvas(ctx, width, height, pixelRatio) {
        const { canvas } = ctx;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        // Resizing resets the context. Set the transform without accumulating scale.
        ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
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
                    drawItem(ctx, offsetX + x * size + x, offsetY + y * size + y, size);
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

    /**
     *
     * @param { number} size
     */
    _initStyles(size) {

        const lineWidth = Math.trunc(size / 10) || 1;

        this._ctx.lineWidth = lineWidth;
        this._ctx.fillStyle = '#000';
        this._ctx.strokeStyle = '#000';

        this._blockCtx.lineWidth = lineWidth;
        this._blockCtx.fillStyle = '#000';
        this._blockCtx.strokeStyle = '#000';

        this._backingCtx.lineWidth = lineWidth;
        this._backingCtx.fillStyle = '#8b9876';
        this._backingCtx.strokeStyle = '#8b9876';

        this._blockBackCtx.lineWidth = lineWidth;
        this._blockBackCtx.fillStyle = '#8b9876';
        this._blockBackCtx.strokeStyle = '#8b9876';
    }

    /**
     * @param { {points: number, cleans: number, level: number, block: Block, time: number} } data
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

        if (this._fields.time) {
            const time = `${String(Math.trunc(data.time / 60)).padStart(2, '0')}:${String(data.time % 60).padStart(2, '0')}`;
            this._fields.time.innerText = time;
        }

        if (this._blockCtx && data.block) {
            const size = this._previewHeight / 2;
            this._blockCtx.clearRect(0, 0, this._previewWidth, this._previewHeight);
            this._drawMap(this._blockCtx, data.block.getMap(), size, true, 0, data.block.y * size);
        }
    }
}
