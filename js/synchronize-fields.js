'use strict';

window.synchronizeFields = (function () {
   /**
   * @param {HTMLElement} firstField
   * @param {HTMLElement} secondField
   * @param {Array<string>} valuesOfFirstField
   * @param {Array<string>} valuesOfSecondField
   * @param {function} callback
   */
  return function (firstField, secondField, valuesOfFirstField, valuesOfSecondField, callback) {
    /** @type {number} */
    var index = valuesOfFirstField.indexOf(firstField.value);

    callback(secondField, valuesOfSecondField[index]);
  };
})();
