'use strict';

/**
 * @param {string} url
 * @param {Function} onLoad
 */
window.load = (function () {
  var similarApartments = [];
  var xhr = new XMLHttpRequest();
  var ERROR_MSG = 'Something\'s went wrong';
  var TIME_IS_OUT_MSG = 'Time\'s up!';
  var TIMEOUT = 10000;

  return function (url, onLoad) {
    xhr.open('GET', url, false);
    xhr.addEventListener('readystatechange', function(evt) {
      switch (evt.target.readyState) {
        case 0:
          console.log('not sent');
          break;

        case 1:
          console.log('opened');
          break;

        case 2:
          console.log('headers recieved');
          break;

        case 3:
          console.log('loading');
          break;

        case 4:
          try {
            similarApartments = JSON.parse(evt.target.response);
            console.log(JSON.stringify(similarApartments));
          } catch(err) {}
          break;
      }
    });

    xhr.addEventListener('error', function() {
      throw new Error(ERROR_MSG);
    });

    xhr.addEventListener('timeout', function() {
      throw new Error(TIME_IS_OUT_MSG);
    });

    xhr.timeout = TIMEOUT;
    xhr.send();
    xhr.abort();
  }
})();




