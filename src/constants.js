export const RotateType = {
    none: 'none',
    full: 'full',
    clockwiseBack: 'clockwise-back'
};

export const BlocksType = {
    blockI: 'I-Block',
    blockJ: 'J-Block',
    blockL: 'L-Block',
    blockO: 'O-Block',
    blockS: 'S-Block',
    blockT: 'T-Block',
    blockZ: 'Z-Block'
};

export const blocksMap = {
    [BlocksType.blockI]: {
        map: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, true, true, true],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ],
        x: 2,
        y: -3,
        rotate: RotateType.clockwiseBack,
        isRotated: false
    },
    [BlocksType.blockJ]: {
        map: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, true, true, false],
            [false, false, false, true, false],
            [false, false, false, false, false]
        ],
        x: 2,
        y: -2,
        rotate: RotateType.full,
        isRotated: false
    },
    [BlocksType.blockL]: {
        map: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, true, true, false],
            [false, true, false, false, false],
            [false, false, false, false, false]
        ],
        x: 2,
        y: -2,
        rotate: RotateType.full,
        isRotated: false
    },
    [BlocksType.blockO]: {
        map: [
            [false, false, false, false, false],
            [false, true, true, false, false],
            [false, true, true, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ],
        x: 2,
        y: -1,
        rotate: RotateType.none,
        isRotated: false
    },
    [BlocksType.blockS]: {
        map: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, true, true, false],
            [false, true, true, false, false],
            [false, false, false, false, false]
        ],
        x: 2,
        y: -2,
        rotate: RotateType.clockwiseBack,
        isRotated: false
    },
    [BlocksType.blockT]: {
        map: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, true, true, false],
            [false, false, true, false, false],
            [false, false, false, false, false]
        ],
        x: 2,
        y: -2,
        rotate: RotateType.full,
        isRotated: false
    },
    [BlocksType.blockZ]: {
        map: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, true, false, false],
            [false, false, true, true, false],
            [false, false, false, false, false]
        ],
        x: 2,
        y: -2,
        rotate: RotateType.clockwiseBack,
        isRotated: false
    }
};
