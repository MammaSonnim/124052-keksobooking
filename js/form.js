'use strict';

var pinMapElement = document.querySelector('.tokyo__pin-map');
var dialogElement = document.querySelector('.dialog');
var dialogCloseBtnElement = dialogElement.querySelector('.dialog__close');
var noticeFormElement = document.querySelector('.notice__form');
var priceInputElement = noticeFormElement.querySelector('#price');
var habitationSelectElement = noticeFormElement.querySelector('#type');
var timeInSelectElement = noticeFormElement.querySelector('#time');
var timeOutSelectElement = noticeFormElement.querySelector('#timeout');
var roomsSelectElement = noticeFormElement.querySelector('#room_number');
var capacitySelectElement = noticeFormElement.querySelector('#capacity');

/** @const {string} */
var PIN_CLASS = 'pin';

/** @const {string} */
var PIN_CLASS_ACTIVE = 'pin--active';

/** @const {string} */
var DIALOG_CSS_VISIBILITY_FALSE = 'hidden';

/** @const {string} */
var DIALOG_CSS_VISIBILITY_TRUE = 'visible';

/** @const {number} */
var SINGLE_ROOM_SIZE_ROOMS = 1;

/** @const {number} */
var SINGLE_ROOM_SIZE_GUESTS = 0;

/** @const {number} */
var NOT_SINGLE_ROOM_SIZE_GUESTS = 3;

/** @const {string} */
var ARIA_CHECKED_ATTRIBUTE = 'aria-checked';

/** @const {number} */
var ENTER_KEY_CODE = 13;

/** @const {number} */
var ESCAPE_KEY_CODE = 27;

/** @type {Array.<Object>} */
var habitationTypes = [
  {
    value: 'flat',
    minPrice: 1000
  },
  {
    value: 'hovel',
    minPrice: 0
  },
  {
    value: 'palace',
    minPrice: 10000
  }
];

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
  syncRoomsWithCapacity();
  addListenersToPageElements();
}

function addListenersToPageElements() {
  pinMapElement.addEventListener('click', pinClickHandler);
  pinMapElement.addEventListener('keydown', pinKeydownHandler);
  dialogCloseBtnElement.addEventListener('click', dialogCloseBtnClickHandler);
  habitationSelectElement.addEventListener('change', habitationChangeHandler);
  roomsSelectElement.addEventListener('change', roomsChangeHandler);
  timeInSelectElement.addEventListener('change', timeInChangeHandler);
  timeOutSelectElement.addEventListener('change', timeOutChangeHandler);
}

// handlers
function pinClickHandler(event) {
  selectPin(event.target);
}

function pinKeydownHandler(event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    selectPin(event.target);
  }
}

function dialogCloseBtnClickHandler(event) {
  closeDialog();
}

function dialogCloseBtnKeydownHandler(event) {
  if (event.keyCode === ESCAPE_KEY_CODE) {
    closeDialog();
  }
}

function habitationChangeHandler(event) {
  syncHabitationTypeWithMinPrice();
}

function roomsChangeHandler(event) {
  syncRoomsWithCapacity();
}

function timeInChangeHandler(event) {
  syncTimeInToTimeOut();
}

function timeOutChangeHandler(event) {
  syncTimeOutToTimeIn();
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

/**
 * Поведение при выборе пина — его активация и открытие диалога
 * @param {HTMLElement} element
 */
function selectPin(element) {
  if (element.classList.contains(PIN_CLASS)) {
    var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

    if (pinActive) {
      pinActive.classList.remove(PIN_CLASS_ACTIVE);
      pinActive.setAttribute(ARIA_CHECKED_ATTRIBUTE, 'false');
    }
    element.classList.add(PIN_CLASS_ACTIVE);
    element.setAttribute(ARIA_CHECKED_ATTRIBUTE, 'false');
    dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_TRUE;
    document.addEventListener('keydown', dialogCloseBtnKeydownHandler);
  }
}

/** Поведение при закрытии диалога — скрытие модального окна и деактивация пина */
function closeDialog() {
  dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_FALSE;
  document.removeEventListener('keydown', dialogCloseBtnKeydownHandler);
  pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
}

/** Сеттинг минимальной цены при выборе типа жилья */
function syncHabitationTypeWithMinPrice() {
  var optionSelected = habitationSelectElement.value;

  for (var n = 0; n < habitationTypes.length; n++) {
    if (optionSelected === habitationTypes[n].value) {
      priceInputElement.min = habitationTypes[n].minPrice;
      break;
    }
  }
}

/** Сеттинг времени заезда при выборе времени выезда */
function syncTimeInToTimeOut() {
  timeOutSelectElement.selectedIndex = timeInSelectElement.selectedIndex;
}

/** Сеттинг времени выезда при выборе времени заезда */
function syncTimeOutToTimeIn() {
  timeInSelectElement.selectedIndex = timeOutSelectElement.selectedIndex;
}

/** Сеттинг количества гостей при выборе количества комнат */
function syncRoomsWithCapacity() {
  capacitySelectElement.value = +roomsSelectElement.value === SINGLE_ROOM_SIZE_ROOMS ?
    SINGLE_ROOM_SIZE_GUESTS : NOT_SINGLE_ROOM_SIZE_GUESTS;
}
