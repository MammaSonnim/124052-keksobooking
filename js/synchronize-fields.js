'use strict';

window.synchronizeFields = (function () {
  /**
   * @param {HTMLElement} firstField
   * @param {HTMLElement} secondField
   * @param {Array<string>} valuesOfFirstField
   * @param {Array<string>} valuesOfSecondField
   * @param {string} syncProperty свойство для синхронизации
   */
  return function (firstField, secondField, valuesOfFirstField, valuesOfSecondField, syncProperty) {
    /** @type {number} */
    var index = valuesOfFirstField.indexOf(firstField.value);

    secondField[syncProperty] = valuesOfSecondField[index];
  };
})();
