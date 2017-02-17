'use strict';

window.initializePins = (function () {
  /** @type {HTMLElement} */
  var pinMapElement = document.querySelector('.tokyo__pin-map');

  /** @type {HTMLElement} */
  var dialogElement = document.querySelector('.dialog');

  /** @type {HTMLElement} */
  var dialogCloseBtnElement = dialogElement.querySelector('.dialog__close');

  /** @const {string} */
  var PIN_CLASS = 'pin';

  /** @const {string} */
  var PIN_CLASS_ACTIVE = 'pin--active';

  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /** @const {number} */
  var ESCAPE_KEY_CODE = 27;

  /** @type {?Function} callback */
  var onHideCard = null;

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
  function dialogCloseBtnClickHandler(event) {
    closeDialog();
  }

  /** @param {KeyboardEvent} event */
  function dialogCloseBtnKeydownHandler(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      closeDialog();
    }
  }

  /**
   * Поведение при выборе пина — его активация и открытие диалога
   * @param {HTMLElement} element
   * @param {?Function} callback
   */
  function selectPin(element, callback) {
    if (element.classList.contains(PIN_CLASS)) {
      var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

      if (pinActive) {
        pinActive.classList.remove(PIN_CLASS_ACTIVE);
        pinActive.setAttribute('aria-checked', 'false');
      }

      element.classList.add(PIN_CLASS_ACTIVE);
      element.setAttribute('aria-checked', 'false');

      window.showCard(callback);
    }
  }

  /** Поведение при закрытии диалога — скрытие модального окна и деактивация пина */
  function closeDialog() {
    dialogElement.style.visibility = 'hidden';
    document.removeEventListener('keydown', dialogCloseBtnKeydownHandler);
    dialogCloseBtnElement.removeEventListener('click', dialogCloseBtnClickHandler);

    if (typeof window.initializePins.onHideCard === 'function') {
      window.initializePins.onHideCard();
    }

    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
  }

  /** Ставит фокус на пин */
  var focusPin = function () {
    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).focus();
  };

  return {
    onHideCard: onHideCard,
    dialogElement: dialogElement,
    dialogCloseBtnElement: dialogCloseBtnElement,
    dialogCloseBtnKeydownHandler: dialogCloseBtnKeydownHandler,
    dialogCloseBtnClickHandler: dialogCloseBtnClickHandler
  };
})();
