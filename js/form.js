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
var capactiySelectElement = noticeFormElement.querySelector('#capacity');

var objectTypes = [
  {
    value: 'Квартира',
    minPrice: 1000
  },
  {
    value: 'Лачуга',
    minPrice: 0
  },
  {
    value: 'Дворец',
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
syncRoomsAndCapacity();
syncTimeInAndTimeOut();
typeSelectElement.addEventListener('change', syncObjectTypeWithMinPrice);
roomsSelectElement.addEventListener('change', syncRoomsAndCapacity);

function openPin(event) {
  if (event.target.classList.contains('pin')) {
    pinsElements.forEach(function (pin) {
      pin.classList.remove('pin--active');
    });
    event.target.classList.add('pin--active');
    dialogElement.style.visibility = 'visible';
  }
}

function closeDialog(event) {
  dialogElement.style.visibility = 'hidden';
  pinMapElement.querySelector('.pin--active').classList.remove('pin--active');
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

function syncRoomsAndCapacity() {
  capactiySelectElement.selectedIndex = roomsSelectElement.selectedIndex === 0 ? 1 : 0;
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
