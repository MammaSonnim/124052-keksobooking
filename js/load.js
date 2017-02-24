'use strict';

window.load = (function () {
  var xhr = new XMLHttpRequest();
  var ERROR_MSG = 'Something\'s went wrong';
  var TIME_IS_OUT_MSG = 'Time\'s up!';
  var TIMEOUT = 10000;

  /**
   * @param {string} url
   * @param {Function} onLoad
   */
  return function (url, onLoad) {
    xhr.open('GET', url);
    xhr.addEventListener('readystatechange', function (evt) {
      switch (evt.target.readyState) {
        case 0:
        case 1:
        case 2:
        case 3:
          break;

        case 4:
          try {
            onLoad(evt.target.response);
          } catch (err) {
            throw new Error(ERROR_MSG);
          }
          break;
      }
    });

    xhr.addEventListener('error', function () {
      throw new Error(ERROR_MSG);
    });

    xhr.addEventListener('timeout', function () {
      throw new Error(TIME_IS_OUT_MSG);
    });

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.send();
  };
})();
