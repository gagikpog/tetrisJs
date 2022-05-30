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

    /**
     * @param { string } element
     */
    constructor(element) {

        this._element = document.querySelector(element);
        this._element.addEventListener('touchstart', (evt) => {
            this._xDown = evt.touches[0]?.clientX;
            this._yDown = evt.touches[0]?.clientY;
        }, false);

        this._element.addEventListener('touchmove', (evt) => {
            this._handleTouchMove(evt);
        }, false);

        this._element.addEventListener('touchend', (evt) => {
            if (!this._xDiff && !this._yDiff) {
                this.onTouch();
            }
            this._xDiff = this._yDiff = this._xDown = this._yDown = 0;
        }, false);


    }

    onTouch(callback) {
        this.onTouch = callback;
        return this;
    }

    onLeft(callback) {
        this.onLeft = callback;
        return this;
    }

    onRight(callback) {
        this.onRight = callback;
        return this;
    }

    onUp(callback) {
        this.onUp = callback;
        return this;
    }

    onDown(callback) {
        this.onDown = callback;
        return this;
    }

    /**
     * @param {TouchEvent} evt
     */
    _handleTouchMove(evt) {
        if (!this._xDown || !this._yDown) {
            return;
        }

        var xUp = evt.touches[0]?.clientX;
        var yUp = evt.touches[0]?.clientY;

        this._xDiff = this._xDown - xUp;
        this._yDiff = this._yDown - yUp;

        if (Math.abs(this._xDiff) > Math.abs(this._yDiff)) {
            if (this._xDiff > 0) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } else {
            if (this._yDiff > 0) {
                this.onUp();
            } else {
                this.onDown();
            }
        }

        this._xDown = 0;
        this._yDown = 0;
    }
}
