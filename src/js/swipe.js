/**
 * https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
 */
export class Swipe {

    /** @private @type { number } */
    _xDown;

    /** @private @type { number } */
    _yDown;

    /** @private @type { number } */
    _xDiff;

    /** @private @type { number } */
    _yDiff;

    /** @private @type { HTMLElement } */
    _element;

    /** @private @type { 'left|right' | 'none' | null } */
    _direction;

    /** @private */
    _onTouchHandler() {}

    /** @private */
    _onUpHandler() {}

    /** @private */
    _onRightHandler() {}

    /** @private */
    _onDownHandler() {}

    /** @private */
    _onLeftHandler() {}

    /**
     * @param { string } element
     */
    constructor(element) {

        this._element = document.querySelector(element);
        this._element.addEventListener('touchstart', (evt) => {
            evt.preventDefault();
            this._xDown = evt.touches[0]?.clientX;
            this._yDown = evt.touches[0]?.clientY;
        }, false);

        this._element.addEventListener('touchmove', (evt) => {
            this._handleTouchMove(evt);
        }, false);

        this._element.addEventListener('touchend', (evt) => {
            if (!this._xDiff && !this._yDiff) {
                this._onTouchHandler();
            }
            this._xDiff = this._yDiff = this._xDown = this._yDown = 0;
            this._direction = null;
        }, false);

    }

    onTouch(callback) {
        this._onTouchHandler = callback;
        return this;
    }

    onLeft(callback) {
        this._onLeftHandler = callback;
        return this;
    }

    onRight(callback) {
        this._onRightHandler = callback;
        return this;
    }

    onUp(callback) {
        this._onUpHandler = callback;
        return this;
    }

    onDown(callback) {
        this._onDownHandler = callback;
        return this;
    }

    /**
     * @param {TouchEvent} evt
     */
    _handleTouchMove(evt) {
        if (!this._xDown || !this._yDown || this._direction === 'none') {
            return;
        }

        var xUp = evt.touches[0]?.clientX;
        var yUp = evt.touches[0]?.clientY;

        this._xDiff = this._xDown - xUp;
        this._yDiff = this._yDown - yUp;

        const delta = Math.sqrt(Math.pow(this._xDiff, 2) + Math.pow(this._yDiff, 2));

        if (delta > 30) {
            if (Math.abs(this._xDiff) > Math.abs(this._yDiff)) {
                if (this._xDiff > 0) {
                    this._onLeftHandler();
                } else {
                    this._onRightHandler();
                }
                this._direction = 'left|right';
            } else {
                if (!this._direction) {
                    this._direction = 'none';
                    if (this._yDiff > 0) {
                        this._onUpHandler();
                    } else {
                        this._onDownHandler();
                    }
                }
            }
            this._xDown = xUp;
            this._yDown = yUp;
        }
    }
}
