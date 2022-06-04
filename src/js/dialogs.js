/**
 * @param { string } dialogId
 * @param { (event: Event) => void } keydownCallback
 * @returns { Promise<string> }
 */
function showDialog(dialogId, keydownCallback) {

    return new Promise((resolve, reject) => {
        const dialog = document.querySelector(dialogId);
        if (dialog) {
            dialog.showModal();
            const buttons = [...(dialog.querySelectorAll('button') || [])];

            const closeHandler = () => dialog.showModal();
            const keydownHandler = (event) => {
                if (keydownCallback) {
                    const command = keydownCallback(event);
                    if (command) {
                        sendAndClose(command);
                    }
                }
            };

            const sendAndClose = (command) => {
                unsubscribeAll(buttons);
                dialog.removeEventListener('close', closeHandler);
                document.body.removeEventListener('keydown', keydownHandler);
                dialog.close();
                resolve(command || null);
            }

            const clickHandler = (event) => {
                sendAndClose(event.target?.dataset?.['command']);
            };

            const subscribeAll = (btns) => btns.forEach((btn) => btn.addEventListener('click', clickHandler));
            const unsubscribeAll = (btns) => btns.forEach((btn) => btn.removeEventListener('click', clickHandler));
            subscribeAll(buttons);
            dialog.addEventListener('close', closeHandler);
            document.body.addEventListener('keydown', keydownHandler);

        } else {
            reject();
        }
    });
}

/**
 * @returns { Promise<string> }
 */
export function showPauseDialog() {
    return showDialog('#pauseDialog', (event) => {
        if (event.code === 'KeyP') {
            event.stopPropagation();
            event.preventDefault();
            return 'pause';
        }
    });
}

/**
 * @returns { Promise<string> }
 */
export function showGameOverDialog() {
    return showDialog('#gameOverDialog', (event) => {
        if (event.code === 'KeyN') {
            event.stopPropagation();
            event.preventDefault();
            return 'newGame';
        }
    });
}
