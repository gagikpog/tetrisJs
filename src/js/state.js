const stateKey = 'tetris-data';

export function loadState() {
    const dataStr = window.localStorage.getItem(stateKey);
    try {
        return dataStr ? JSON.parse(dataStr) : {};
    } catch (error) {
        return {};
    }
}

export function saveState(data) {
    window.localStorage.setItem(stateKey, JSON.stringify(data));
}
