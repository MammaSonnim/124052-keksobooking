'use strict';

var pinMapElement = document.querySelector('.tokyo__pin-map');
var pinsElements = pinMapElement.querySelectorAll('.pin');
var dialogElement = document.querySelector('.dialog');
var dialogCloseBtnElement = dialogElement.querySelector('.dialog__close');
var noticeFormElement = document.querySelector('.notice__form');
var priceInputElement = noticeFormElement.querySelector('#price');
var typeSelectElement = noticeFormElement.querySelector('#type');
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

var objectTypes = [
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

var inputsDetails = [
  {
    selector: noticeFormElement.querySelector('#title'),
    rules: {
      required: true,
      minLength: 30,
      maxLength: 100
    }
  },
  {
    selector: noticeFormElement.querySelector('#price'),
    rules: {
      required: true,
      type: 'number',
      min: 1000,
      max: 1000000
    }
  },
  {
    selector: noticeFormElement.querySelector('#address'),
    rules: {
      required: true
    }
  }
];

// init
pinMapElement.addEventListener('click', openPin);
pinsElements.forEach(function (element) {
  element.querySelector('img').style.pointerEvents = 'none';
});
dialogCloseBtnElement.addEventListener('click', closeDialog);
setLimitsToInputs(inputsDetails);
syncRoomsWithCapacity();
syncTimeInAndTimeOut();
typeSelectElement.addEventListener('change', syncObjectTypeWithMinPrice);
roomsSelectElement.addEventListener('change', syncRoomsWithCapacity);

function openPin(event) {
  if (event.target.classList.contains(PIN_CLASS)) {
    pinsElements.forEach(function (pin) {
      pin.classList.remove(PIN_CLASS_ACTIVE);
    });
    event.target.classList.add(PIN_CLASS_ACTIVE);
    dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_TRUE;
  }
}

function closeDialog() {
  dialogElement.style.visibility = DIALOG_CSS_VISIBILITY_FALSE;
  pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
}

function setLimitsToInputs(inputs) {
  inputs.forEach(function (input) {
    for (var rule in input.rules) {
      if (!input.rules.hasOwnProperty(rule)) {
        continue;
      }
      input.selector[rule] = input.rules[rule];
    }
  });
}

// // TODO add to destroy method
// function removeLimitsFromInputs(inputs) {
//   inputs.forEach(function (input) {
//     for (var rule in input.rules) {
//       if (!input.rules.hasOwnProperty(rule)) {
//        continue;
//       }
//       input.selector[rule] = !input.rules[rule];
//     }
//   });
// }

function syncObjectTypeWithMinPrice() {
  var optionSelected = getSelectedOption(typeSelectElement);

  for (var n = 0; n < objectTypes.length; n++) {
    if (optionSelected.value === objectTypes[n].value) {
      priceInputElement.min = objectTypes[n].minPrice;
      break;
    }
  }
}

function syncTimeInAndTimeOut() {
  timeInSelectElement.addEventListener('change', function () {
    timeOutSelectElement.selectedIndex = timeInSelectElement.selectedIndex;
  });

  timeOutSelectElement.addEventListener('change', function () {
    timeInSelectElement.selectedIndex = timeOutSelectElement.selectedIndex;
  });
}

function syncRoomsWithCapacity() {
  capacitySelectElement.value = roomsSelectElement.value === SINGLE_ROOM_SIZE_ROOMS ?
    SINGLE_ROOM_SIZE_GUESTS : NOT_SINGLE_ROOM_SIZE_GUESTS;
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
