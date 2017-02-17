'use strict';

window.showCard = (function () {

  return function (callback) {
    window.initializePins.dialogElement.style.visibility = 'visible';
    document.addEventListener('keydown', window.initializePins.dialogCloseBtnKeydownHandler);
    window.initializePins.dialogCloseBtnElement.addEventListener('click', window.initializePins.dialogCloseBtnClickHandler);

    window.initializePins.onHideCard = callback;
  };
})();
