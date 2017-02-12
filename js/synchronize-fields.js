'use strict';

window.synchronizeFields = function (firstField, secondField, valuesOfFirstField, valuesOfSecondField, syncProperty) {
  /** @type {number} */
  var index = valuesOfFirstField.indexOf(firstField.value);

  secondField[syncProperty] = valuesOfSecondField[index];
};
