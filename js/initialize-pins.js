'use strict';

window.initializePins = function () {
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

  /** @const {string} */
  var DIALOG_CSS_VISIBILITY_FALSE = 'hidden';

  /** @const {string} */
  var DIALOG_CSS_VISIBILITY_TRUE = 'visible';

  /** @const {string} */
  var ARIA_CHECKED_ATTRIBUTE = 'aria-checked';

  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /** @const {number} */
  var ESCAPE_KEY_CODE = 27;

  pinMapElement.addEventListener('click', pinClickHandler);
  pinMapElement.addEventListener('keydown', pinKeydownEnterHandler);
  dialogCloseBtnElement.addEventListener('click', dialogCloseBtnClickHandler);

  function pinClickHandler(event) {
    selectPin(event.target);
  }

  function pinKeydownEnterHandler(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      selectPin(event.target);
    }
  }

  function dialogCloseBtnClickHandler(event) {
    closeDialog();
  }

  function dialogCloseBtnKeydownEscHandler(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      closeDialog();
    }
  }

  /**
   * Поведение при выборе пина — его активация и открытие диалога
   * @param {HTMLElement} element
   */
  function selectPin(element) {
    if (element.classList.contains(PIN_CLASS)) {
      var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

      if (pinActive) {
        pinActive.classList.remove(PIN_CLASS_ACTIVE);
        pinActive.setAttribute(window.ARIA_CHECKED_ATTRIBUTE, 'false');
      }
      element.classList.add(PIN_CLASS_ACTIVE);
      element.setAttribute(ARIA_CHECKED_ATTRIBUTE, 'false');
      dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_TRUE;
      document.addEventListener('keydown', dialogCloseBtnKeydownEscHandler);
    }
  }

  /** Поведение при закрытии диалога — скрытие модального окна и деактивация пина */
  function closeDialog() {
    dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_FALSE;
    document.removeEventListener('keydown', dialogCloseBtnKeydownEscHandler);
    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
  }
};
