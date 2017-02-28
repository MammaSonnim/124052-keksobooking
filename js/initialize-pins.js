'use strict';

window.initializePins = (function () {
  /** @type {HTMLElement} */
  var pinMapElement = document.querySelector('.tokyo__pin-map');

  /** @type {HTMLElement} */
  var pinMainElement = document.querySelector('.pin__main');

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

  /** @type {HTMLElement} */
  var filtersFormElement = document.querySelector('.tokyo__filters');

  window.load(SIMILAR_APARTMENTS_URL, function (data) {
    similarApartments = data;

    renderPins(similarApartments.slice(0, APARTMENTS_TO_RENDER_QUANTITY));

    filtersFormElement.addEventListener('change', function () {
      clearMap();
      renderPins(window.filterPins(similarApartments));
    });
  });

  /** Очистка карты от пинов */
  function clearMap() {
    window.showCard.close();
    pinMapElement.innerHTML = pinMainElement.outerHTML;
  }

  /**
   * Отрисовка всех пинов по приходящим данным
   * @param {Object} data
   */
  function renderPins(data) {
    data.forEach(function (pinData) {
      var newPin = window.renderPin(pinData);

      newPin.addEventListener('click', function (event) {
        selectPin(pinData, event.target, deactivatePin);
      });

      newPin.addEventListener('keydown', function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
          selectPin(pinData, event.target, deactivatePin, focusPin);
        }
      });

      fragment.appendChild(newPin);
      pinMapElement.appendChild(fragment);
    });
  }

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

      window.showCard.open(data, function () {
        if (typeof optCallback === 'function') {
          optCallback();
        }
        deactivateCallback();
      });
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
