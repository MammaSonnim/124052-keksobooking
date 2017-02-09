'use strict';

/** @type {HTMLElement} */
var noticeFormElement = document.querySelector('.notice__form');

/** @type {HTMLElement} */
var habitationSelectElement = noticeFormElement.querySelector('#type');

/** @type {HTMLElement} */
var priceInputElement = noticeFormElement.querySelector('#price');

/** @type {HTMLElement} */
var timeInSelectElement = noticeFormElement.querySelector('#time');

/** @type {HTMLElement} */
var timeOutSelectElement = noticeFormElement.querySelector('#timeout');

/** @type {HTMLElement} */
var roomsSelectElement = noticeFormElement.querySelector('#room_number');

/** @type {HTMLElement} */
var capacitySelectElement = noticeFormElement.querySelector('#capacity');

/** @const {Array.<number>} */
var TIME_IN_ARRAY = [12, 13, 14];

/** @const {Array.<number>} */
var TIME_OUT_ARRAY = [12, 13, 14];

/** @const {Array.<string>} */
var HABITATION_TYPES = ['flat', 'hovel', 'palace'];

/** @const {Array.<number>} */
var HABITATION_MIN_PRICE = [1000, 0, 10000];

/** @const {Array.<number>} */
var ROOMS_QUANTITY = [1, 2, 100];

/** @const {Array.<number>} */
var GUESTS_QUANTITY = [0, 3, 3];

/** @type {Array.<Object>} */
var inputDetails = [
  {
    element: noticeFormElement.querySelector('#title'),
    attributes: {
      required: true,
      minLength: 30,
      maxLength: 100
    }
  },
  {
    element: noticeFormElement.querySelector('#price'),
    attributes: {
      required: true,
      type: 'number',
      min: 1000,
      max: 1000000
    }
  },
  {
    element: noticeFormElement.querySelector('#address'),
    attributes: {
      required: true
    }
  }
];

initPage();

/** навешивание аттрибутов при открытии страницы */
function initPage() {
  setInputAttributes(inputDetails);
  window.synchronizeFields(roomsSelectElement, capacitySelectElement, ROOMS_QUANTITY, GUESTS_QUANTITY, 'value');
  window.initializePins();
  addListenersToPageElements();
}

function addListenersToPageElements() {
  habitationSelectElement.addEventListener('change', habitationChangeHandler);
  roomsSelectElement.addEventListener('change', roomsChangeHandler);
  timeInSelectElement.addEventListener('change', timeInChangeHandler);
  timeOutSelectElement.addEventListener('change', timeOutChangeHandler);
}

function habitationChangeHandler(event) {
  window.synchronizeFields(habitationSelectElement, priceInputElement, HABITATION_TYPES, HABITATION_MIN_PRICE, 'min');
}

function roomsChangeHandler(event) {
  window.synchronizeFields(roomsSelectElement, capacitySelectElement, ROOMS_QUANTITY, GUESTS_QUANTITY, 'value');
}

function timeInChangeHandler(event) {
  window.synchronizeFields(timeInSelectElement, timeOutSelectElement, TIME_IN_ARRAY, TIME_OUT_ARRAY, 'value');
}

function timeOutChangeHandler(event) {
  window.synchronizeFields(timeOutSelectElement, timeInSelectElement, TIME_OUT_ARRAY, TIME_IN_ARRAY, 'value');
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
