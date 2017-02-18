'use strict';

window.showCard = (function () {
  /** @type {HTMLElement} */
  var cardElement = document.querySelector('.dialog');

  /** @param {Function=} optCallback */
  return function (optCallback) {
    cardElement.style.visibility = 'visible';

    if (typeof optCallback === 'function') {
      window.onHideCard = optCallback;
    }
  };
})();
