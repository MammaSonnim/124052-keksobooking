'use strict';

window.renderData = (function () {
  var templateElement = document.querySelector('#pin-template');
  var pinToClone = templateElement.content.querySelector('.pin');
  var newPin = pinToClone.cloneNode(true);
  var SIMILAR_APPARTMENTS_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var similarAppartments = window.load(SIMILAR_APPARTMENTS_URL, function () {
    console.log('piu')
  });

  return function () {
    document.body.appendChild(newPin);
    newPin.addEventListener('click', function() {
      alert('Я умею работать с шаблонами');
    });
  }
})();
