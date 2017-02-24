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

  /** @const {string} */
  var SIMILAR_APARTMENTS_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  /** @const {number} */
  var APARTMENTS_TO_RENDER_QUANTITY = 3;

  /** @type {Array} */
  var similarApartments = [];

  /** @type {HTMLElement} */
  var fragment = document.createDocumentFragment();

  window.load(SIMILAR_APARTMENTS_URL, function (data) {
    similarApartments = data.slice(0, APARTMENTS_TO_RENDER_QUANTITY);

    similarApartments.forEach(function (apartmentData) {
      var newPin = window.renderPin(apartmentData);

      newPin.addEventListener('click', function () {
        selectPin(apartmentData, event.target, deactivatePin);
      });

      newPin.addEventListener('keydown', function () {
        if (event.keyCode === ENTER_KEY_CODE) {
          selectPin(apartmentData, event.target, deactivatePin, focusPin);
        }
      });

      fragment.appendChild(newPin);
    });

    pinMapElement.appendChild(fragment);
  });

  /**
   * Поведение при выборе пина — его активация и открытие диалога
   * @param {Object} data
   * @param {HTMLElement} element
   * @param {Function=} deactivateCallback
   * @param {Function=} optCallback
   */
  function selectPin(data, element, deactivateCallback, optCallback) {
    if (element.classList.contains(PIN_CLASS)) {
      var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

      if (pinActive) {
        pinActive.classList.remove(PIN_CLASS_ACTIVE);
        pinActive.setAttribute('aria-checked', 'false');
      }

      element.classList.add(PIN_CLASS_ACTIVE);
      element.setAttribute('aria-checked', 'true');

      window.showCard(data, deactivateCallback, optCallback);
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
