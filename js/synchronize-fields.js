'use strict';

window.synchronizeFields = (function () {
  var errorMsg = 'Не определено правило для сравнения полей';

   /**
   * @param {HTMLElement} firstField
   * @param {HTMLElement} secondField
   * @param {Array<string>} valuesOfFirstField
   * @param {Array<string>} valuesOfSecondField
   * @param {Function} callback
   */
  return function (firstField, secondField, valuesOfFirstField, valuesOfSecondField, callback) {
    /** @type {number} */
    var index = valuesOfFirstField.indexOf(firstField.value);

    if (typeof callback === 'function') {
      callback(secondField, valuesOfSecondField[index]);
    } else {
      throw new Error(errorMsg);
    }
  };
})();
