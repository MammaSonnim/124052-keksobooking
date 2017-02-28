'use strict';

window.form = (function () {
  /** @type {HTMLElement} */
  var noticeFormElement = document.querySelector('.notice__form');

  /** @type {HTMLElement} */
  var habitationSelectElement = noticeFormElement.querySelector('#type');

  /** @type {HTMLElement} */
  var titleInputElement = noticeFormElement.querySelector('#title');

  /** @type {HTMLElement} */
  var priceInputElement = noticeFormElement.querySelector('#price');

  /** @type {HTMLElement} */
  var addressInputElement = noticeFormElement.querySelector('#address');

  /** @type {HTMLElement} */
  var timeInSelectElement = noticeFormElement.querySelector('#time');

  /** @type {HTMLElement} */
  var timeOutSelectElement = noticeFormElement.querySelector('#timeout');

  /** @type {HTMLElement} */
  var roomsSelectElement = noticeFormElement.querySelector('#room_number');

  /** @type {HTMLElement} */
  var capacitySelectElement = noticeFormElement.querySelector('#capacity');

  /** @const {Array.<string>} */
  var TIME_IN_ARRAY = ['12', '13', '14'];

  /** @const {Array.<string>} */
  var TIME_OUT_ARRAY = ['12', '13', '14'];

  /** @const {Array.<string>} */
  var HABITATION_TYPES = ['flat', 'hovel', 'palace'];

  /** @const {Array.<string>} */
  var HABITATION_MIN_PRICE = ['1000', '0', '10000'];

  /** @const {Array.<string>} */
  var ROOMS_QUANTITY = ['1', '2', '100'];

  /** @const {Array.<string>} */
  var GUESTS_QUANTITY = ['0', '3', '3'];

  /** @const {number} */
  var TITLE_MIN_LENGTH = 30;

  /** @const {number} */
  var TITLE_MAX_LENGTH = 100;

  /** @const {string} */
  var WRONG_LENGTH_MSG = 'Минимум символов: ' + TITLE_MIN_LENGTH.toString() + '. Максимум: ' + TITLE_MAX_LENGTH.toString();

  /** @type {Array.<Object>} */
  var inputDetails = [
    {
      element: titleInputElement,
      attributes: {
        required: true,
        minLength: TITLE_MIN_LENGTH,
        maxLength: 100
      }
    },
    {
      element: priceInputElement,
      attributes: {
        required: true,
        type: 'number',
        min: 1000,
        max: 1000000
      }
    },
    {
      element: addressInputElement,
      attributes: {
        required: true
      }
    }
  ];

  initPage();

  /** навешивание аттрибутов и слушателей при открытии страницы */
  function initPage() {
    setInputAttributes(inputDetails);
    window.synchronizeFields(roomsSelectElement, capacitySelectElement, ROOMS_QUANTITY, GUESTS_QUANTITY, function (element, value) {
      element.value = value;
    });
    addListenersToPageElements();
  }

  function addListenersToPageElements() {
    habitationSelectElement.addEventListener('change', habitationChangeHandler);
    roomsSelectElement.addEventListener('change', roomsChangeHandler);
    timeInSelectElement.addEventListener('change', timeInChangeHandler);
    timeOutSelectElement.addEventListener('change', timeOutChangeHandler);
    titleInputElement.addEventListener('input', titleInputHandler);
  }

  /** @param {Event} event*/
  function habitationChangeHandler(event) {
    window.synchronizeFields(
        habitationSelectElement,
        priceInputElement,
        HABITATION_TYPES,
        HABITATION_MIN_PRICE,
        function (element, value) {
          element.min = value;
        }
    );
  }

  /** @param {Event} event*/
  function roomsChangeHandler(event) {
    window.synchronizeFields(
        roomsSelectElement,
        capacitySelectElement,
        ROOMS_QUANTITY,
        GUESTS_QUANTITY,
        function (element, value) {
          element.value = value;
        }
    );
  }

  /** @param {Event} event*/
  function timeInChangeHandler(event) {
    window.synchronizeFields(
        timeInSelectElement,
        timeOutSelectElement,
        TIME_IN_ARRAY,
        TIME_OUT_ARRAY,
        function (element, value) {
          element.value = value;
        }
    );
  }

  /** @param {Event} event*/
  function timeOutChangeHandler(event) {
    window.synchronizeFields(
        timeOutSelectElement,
        timeInSelectElement,
        TIME_OUT_ARRAY,
        TIME_IN_ARRAY,
        function (element, value) {
          element.value = value;
        }
    );
  }

  /** @param {Event} event*/
  function titleInputHandler(event) {
    if (titleInputElement.value.length < TITLE_MIN_LENGTH ||
      titleInputElement.value.length > TITLE_MAX_LENGTH) {
      titleInputElement.setCustomValidity(WRONG_LENGTH_MSG);
    } else {
      titleInputElement.setCustomValidity('');
    }
  }

  /**
   * Пробегается по всем объектам, содержащим информацию об инпутах из массива,
   * и сеттит в каждый соответствующий инпут аттрибуты из объекта
   * @param {Array.<Object>} inputInfo объекты с информацией по каждому инпуту
   */
  function setInputAttributes(inputInfo) {
    inputInfo.forEach(function (input) {
      for (var attribute in input.attributes) {
        if (!input.attributes.hasOwnProperty(attribute)) {
          continue;
        }
        input.element[attribute] = input.attributes[attribute];
      }
    });
  }
})();
