'use strict';

window.initializePins = (function () {
  /** @type {HTMLElement} */
  var pinMapElement = document.querySelector('.tokyo__pin-map');

  /** @type {HTMLElement} */
  var cardElement = document.querySelector('.dialog');

  /** @type {HTMLElement} */
  var cardCloseBtnElement = cardElement.querySelector('.dialog__close');

  /** @const {string} */
  var PIN_CLASS = 'pin';

  /** @const {string} */
  var PIN_CLASS_ACTIVE = 'pin--active';

  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /** @const {number} */
  var ESCAPE_KEY_CODE = 27;

  pinMapElement.addEventListener('click', pinClickHandler);
  pinMapElement.addEventListener('keydown', pinKeydownHandler);

  /** @param {MouseEvent} event */
  function pinClickHandler(event) {
    selectPin(event.target);
  }

  /** @param {KeyboardEvent} event */
  function pinKeydownHandler(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      selectPin(event.target, focusPin);
    }
  }

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

  /**
   * Поведение при выборе пина — его активация и открытие диалога
   * @param {HTMLElement} element
   * @param {Function=} optCallback
   */
  function selectPin(element, optCallback) {
    if (element.classList.contains(PIN_CLASS)) {
      var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

      if (pinActive) {
        pinActive.classList.remove(PIN_CLASS_ACTIVE);
        pinActive.setAttribute('aria-checked', 'false');
      }

      element.classList.add(PIN_CLASS_ACTIVE);
      element.setAttribute('aria-checked', 'false');

      window.showCard(optCallback);
      document.addEventListener('keydown', cardCloseBtnKeydownHandler);
      cardCloseBtnElement.addEventListener('click', cardCloseBtnClickHandler);
    }
  }

  /** Поведение при закрытии диалога — скрытие модального окна и деактивация пина */
  function closeCard() {
    cardElement.style.visibility = 'hidden';
    document.removeEventListener('keydown', cardCloseBtnKeydownHandler);
    cardCloseBtnElement.removeEventListener('click', cardCloseBtnClickHandler);

    if (typeof window.onHideCard === 'function') {
      window.onHideCard();
    }

    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
  }

  /** Ставит фокус на пин */
  var focusPin = function () {
    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).focus();
  };
})();
