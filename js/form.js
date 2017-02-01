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

var PIN_CLASS = 'pin';
var PIN_CLASS_ACTIVE = 'pin--active';
var DIALOG_CSS_VISIBILITY_FALSE = 'hidden';
var DIALOG_CSS_VISIBILITY_TRUE = 'visible';

var SINGLE_ROOM_SIZE_ROOMS = '1';
var SINGLE_ROOM_SIZE_GUESTS = 'null';
var NOT_SINGLE_ROOM_SIZE_GUESTS = '3';

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

function initPage() {
  setInputAttributes(inputDetails);
  syncRoomsWithCapacity();
  addListenersToPageElements();
}

function addListenersToPageElements() {
  pinMapElement.addEventListener('click', pinClickHandler);
  dialogCloseBtnElement.addEventListener('click', dialogCloseBtnClickHandler);
  habitationSelectElement.addEventListener('change', habitationChangeHandler);
  roomsSelectElement.addEventListener('change', roomsChangeHandler);
  timeInSelectElement.addEventListener('change', timeInChangeHandler);
  timeOutSelectElement.addEventListener('change', timeOutChangeHandler);
}

// handlers
function pinClickHandler(event) {
  openPin(event);
}

function dialogCloseBtnClickHandler(event) {
  closeDialog()
}

function habitationChangeHandler(event) {
  syncHabitationTypeWithMinPrice()
}

function roomsChangeHandler(event) {
  syncRoomsWithCapacity()
}

function timeInChangeHandler(event) {
  syncTimeInToTimeOut()
}

function timeOutChangeHandler(event) {
  syncTimeOutToTimeIn()
}

// business logic
function setInputAttributes(inputs) {
  inputs.forEach(function (input) {
    for (var attribute in input.attributes) {
      if (!input.attributes.hasOwnProperty(attribute)) {
        continue;
      }
      input.element[attribute] = input.attributes[attribute];
    }
  });
}

function getSelectedOption(select) {
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].selected) {
      var optionSelected = select.options[i];
      break;
    }
  }

  return optionSelected;
}

function openPin(event) {
  if (event.target.classList.contains(PIN_CLASS)) {
    var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

    if (pinActive) {
      pinActive.classList.remove(PIN_CLASS_ACTIVE);
    }
    event.target.classList.add(PIN_CLASS_ACTIVE);
    dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_TRUE;
  }
}

function closeDialog() {
  dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_FALSE;
  pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
}

function syncHabitationTypeWithMinPrice() {
  var optionSelected = getSelectedOption(habitationSelectElement);

  for (var n = 0; n < habitationTypes.length; n++) {
    if (optionSelected.value === habitationTypes[n].value) {
      priceInputElement.min = habitationTypes[n].minPrice;
      break;
    }
  }
}

function syncTimeInToTimeOut() {
  timeOutSelectElement.selectedIndex = timeInSelectElement.selectedIndex;
}

function syncTimeOutToTimeIn() {
  timeInSelectElement.selectedIndex = timeOutSelectElement.selectedIndex;
}

function syncRoomsWithCapacity() {
  capacitySelectElement.value = roomsSelectElement.value === SINGLE_ROOM_SIZE_ROOMS ?
    SINGLE_ROOM_SIZE_GUESTS : NOT_SINGLE_ROOM_SIZE_GUESTS;
}
