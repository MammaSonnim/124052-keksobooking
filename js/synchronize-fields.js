'use strict';

window.synchronizeFields = function (firstField, secondField, valuesOfFirstField, valuesOfSecondField, syncProperty) {
  var optionSelected = firstField.value;

  for (var i = 0; i < valuesOfFirstField.length; i++) {

    if (optionSelected === String(valuesOfFirstField[i])) {
      secondField[syncProperty] = valuesOfSecondField[i];
      break;
    }
  }
};
