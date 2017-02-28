'use strict';

window.renderPin = (function () {
  /** @type {HTMLElement} */
  var templateElement = document.querySelector('#pin-template');

  /** @type {HTMLElement} */
  var pinToClone = templateElement.content.querySelector('.pin');

  /** @type {Node} */
  var newPin;

  /** @type {HTMLElement} */
  var pinImg;

  /** @const {number} */
  var PIN_WIDTH = 56;

  /** @const {number} */
  var PIN_HEIGHT = 75;

  /**
   * @param {Object} data данные пина
   * @return {HTMLElement} newPin
   */
  return function (data) {
    newPin = pinToClone.cloneNode(true);
    pinImg = newPin.querySelector('img');

    newPin.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
    newPin.style.top = data.location.y - PIN_HEIGHT + 'px';
    newPin.setAttribute('aria-checked', 'false');
    pinImg.src = data.author.avatar;

    return newPin;
  };
})();
