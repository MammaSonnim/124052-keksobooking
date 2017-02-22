'use strict';

window.initializePins = (function () {
  /** @type {HTMLElement} */
  var pinMapElement = document.querySelector('.tokyo__pin-map');

  /** @const {string} */
  var PIN_CLASS = 'pin';

  /** @const {string} */
  var PIN_CLASS_ACTIVE = 'pin--active';

  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  pinMapElement.addEventListener('click', pinClickHandler);
  pinMapElement.addEventListener('keydown', pinKeydownHandler);

  /** @param {MouseEvent} event */
  function pinClickHandler(event) {
    selectPin(event.target, deactivatePin);
  }

  /** @param {KeyboardEvent} event */
  function pinKeydownHandler(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      selectPin(event.target, deactivatePin, focusPin);
    }
  }

  /**
   * Поведение при выборе пина — его активация и открытие диалога
   * @param {HTMLElement} element
   * @param {Function=} deactivateCallback
   * @param {Function=} optCallback
   */
  function selectPin(element, deactivateCallback, optCallback) {
    if (element.classList.contains(PIN_CLASS)) {
      var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

      if (pinActive) {
        pinActive.classList.remove(PIN_CLASS_ACTIVE);
        pinActive.setAttribute('aria-checked', 'false');
      }

      element.classList.add(PIN_CLASS_ACTIVE);
      element.setAttribute('aria-checked', 'false');

      window.showCard(deactivateCallback, optCallback);
    }
  }

  /** Ставит фокус на пин */
  var focusPin = function () {
    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).focus();
  };

  /** Убирает активность пина */
  var deactivatePin = function () {
    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
  };
})();
