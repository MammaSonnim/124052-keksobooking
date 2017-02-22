'use strict';

window.showCard = (function () {
  /** @type {HTMLElement} */
  var cardElement = document.querySelector('.dialog');

  /** @type {HTMLElement} */
  var cardCloseBtnElement = cardElement.querySelector('.dialog__close');

  /** @const {number} */
  var ESCAPE_KEY_CODE = 27;

  /** @type {?Function} */
  var onHideCallback = null;

  /** @param {MouseEvent} event */
  function cardCloseBtnClickHandler(event) {
    closeCard();
  }

  /** @param {KeyboardEvent} event */
  function cardCloseBtnKeydownHandler(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      closeCard();
    }
  }

  /** @param {boolean} flag */
  function toggleCardVisibility(flag) {
    cardElement.classList.toggle('visible', flag);
  }

  /** Поведение при закрытии диалога — скрытие модального окна и деактивация пина */
  function closeCard() {
    toggleCardVisibility(false);
    document.removeEventListener('keydown', cardCloseBtnKeydownHandler);
    cardCloseBtnElement.removeEventListener('click', cardCloseBtnClickHandler);

    onHideCallback();
  }

  /** @param {Function} deactivatePinCallback
   *  @param {Function=} optCallback
   */
  return function (deactivatePinCallback, optCallback) {
    toggleCardVisibility(true);

    document.addEventListener('keydown', cardCloseBtnKeydownHandler);
    cardCloseBtnElement.addEventListener('click', cardCloseBtnClickHandler);

    onHideCallback = function () {
      if (typeof optCallback === 'function') {
        optCallback();
      }
      deactivatePinCallback();
    };
  };
})();
