'use strict';

window.renderPin = (function () {
  /** @type {HTMLElement} */
  var templateElement = document.querySelector('#pin-template');

  /** @type {HTMLElement} */
  var pinToClone = templateElement.content.querySelector('.pin');

  /** @type {HTMLElement} */
  var newPin;

  /** @type {HTMLElement} */
  var pinImg;

  /**
   * @param {Object} data данные пина
   * @return {HTMLElement} newPin
   */
  return function (data) {
    newPin = pinToClone.cloneNode(true);
    pinImg = newPin.querySelector('img');

    newPin.style.left = data.location.x + 'px';
    newPin.style.top = data.location.y + 'px';
    newPin.tabIndex = 0;
    newPin.setAttribute('aria-checked', 'false');
    pinImg.src = data.author.avatar;

    return newPin;
  };
})();
