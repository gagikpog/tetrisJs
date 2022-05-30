import { BlocksType } from "./constants.js";

/**
 * @param { boolean[][] } map
 * @param { Block } block
 */
export function copyToMap(map, block) {
    let y = 0;
    let x = 0;
    const blockMap = block.getMap();
    for (y = 0; y < blockMap.length; y++) {
        for (x = 0; x < blockMap[y].length; x++) {
            if (blockMap[y][x]) {
                map[y + block.y][x + block.x] = true;
            }
        }
    }
}

/**
 * 
 * @param { boolean[][] } map
 * @param { boolean[][] } blockMap
 * @param { number } startX
 * @param { number } startY
 * @returns { boolean }
 */
export function canMove(map, blockMap, startX, startY) {

    let y = 0;
    let x = 0;
    for (y = 0; y < blockMap.length; y++) {
        for (x = 0; x < blockMap[y].length; x++) {
            if (blockMap[y][x] && map[y + startY]?.[x + startX] !== false) {
                return false;
            }
        }
    }

    return true;
}

/**
 * @param { CanvasRenderingContext2D } ctx
 * @param { number } x
 * @param { number } y
 * @param { number } size
 */
export function drawItem(ctx, x, y, size) {

    const offset = size > 30 ? size * 0.26 : size * 0.30;
    ctx.beginPath();
    ctx.moveTo(x + offset, y + offset);
    ctx.lineTo(x + offset, y + size - offset);
    ctx.lineTo(x + size - offset, y + size - offset);
    ctx.lineTo(x + size - offset, y + offset);
    ctx.fill();

    const inner = 5;
    ctx.beginPath();
    ctx.moveTo(x + inner, y + inner);
    ctx.lineTo(x + inner, y + size - inner);
    ctx.lineTo(x + size - inner, y + size - inner);
    ctx.lineTo(x + size - inner, y + inner);
    ctx.closePath();
    ctx.stroke();
}

/**
 * @param { boolean[][] } map
 * @param { boolean } clockwise
 * @return { boolean[][] }
 */
export function rotate(map, clockwise = true) {
    return clockwise ? rotateCounterClockwise(map) : rotateClockwise(map);
}

/**
 * @returns { keyof BlocksType }
 */
export function getRandomBlock() {
    const blocks = Object.keys(BlocksType)
    const index = Math.trunc(Math.random() * blocks.length);
    return BlocksType[blocks[index]];
}

/**
 * @param { boolean[][] } matrix
 * @returns { boolean[][] }
 */
function rotateCounterClockwise(matrix) {
    const newMatrix = matrix.map((row) => [...row]);
    const n = newMatrix.length;
    for (let i = 0; i < n / 2; i++) {
        for (let j = i; j < n - i - 1; j++) {
            const tmp = newMatrix[i][j];
            newMatrix[i][j] = newMatrix[n - j - 1][i];
            newMatrix[n - j - 1][i] = newMatrix[n - i - 1][n - j - 1];
            newMatrix[n - i - 1][n - j - 1] = newMatrix[j][n - i - 1];
            newMatrix[j][n - i - 1] = tmp;
        }
    }
    return newMatrix;
}

/**
 * @param { boolean[][] } matrix
 * @returns { boolean[][] }
 */
function rotateClockwise(matrix) {

    const newMatrix = matrix.map((row) => [...row]);

    const n = newMatrix.length;
    for (let i = 0; i < n / 2; i++) {
        for (let j = i; j < n - i - 1; j++) {
            const tmp = newMatrix[i][j];
            newMatrix[i][j] = newMatrix[j][n - i - 1];
            newMatrix[j][n - i - 1] = newMatrix[n - i - 1][n - j - 1];
            newMatrix[n - i - 1][n - j - 1] = newMatrix[n - j - 1][i];
            newMatrix[n - j - 1][i] = tmp;
        }
    }
    return newMatrix;
}

/**
 * @param { boolean[][] } map
 * @returns { number } removedCount
 */
export function clearFullRows(map) {

    const newMap = map.filter((arr) => !arr.every(Boolean));
    const removedCount = map.length - newMap.length;

    if (removedCount) {
        for (let i = 0; i < map.length; i++) {
            if (i < removedCount) {
                map[i] = Array(map[i].length).fill(false);
            } else {
                map[i] = newMap[i - removedCount];
            }
        }
    }

    return removedCount;
}

export function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

/**
 * @param {number} time
 * @returns { number }
 */
export function getLevel(time) {
    return Math.trunc(time * 1 / 60) + 1;
}

const maxLevel = 200;
const maxInterval = Math.log(maxLevel) * 100;

/**
 * @param {number} level
 * @returns { number }
 */
export function getInterval(level) {
    return level < maxLevel ? maxInterval - Math.log(level) * 100 : 0;
}
