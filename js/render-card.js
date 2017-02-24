'use strict';

window.renderCard = (function () {
  /** @type {HTMLElement} */
  var cardTemplate = document.querySelector('#dialog-template');

  /** @type {HTMLElement} */
  var cardElement = cardTemplate.content.querySelector('.dialog');

  /** @type {HTMLElement} */
  var cardClone = cardElement.cloneNode(true);

  /** @type {HTMLElement} */
  var cardTitleElement = cardClone.querySelector('.dialog__title');

  /** @type {HTMLElement} */
  var cardAvatarElement = cardTitleElement.querySelector('img');

  /** @type {HTMLElement} */
  var offerTitleElement = cardClone.querySelector('.lodge__title');

  /** @type {HTMLElement} */
  var offerAddressElement = cardClone.querySelector('.lodge__address');

  /** @type {HTMLElement} */
  var offerPriceElement = cardClone.querySelector('.lodge__price');

  /** @type {HTMLElement} */
  var offerTypeElement = cardClone.querySelector('.lodge__type');

  /** @type {HTMLElement} */
  var offerRoomsAndGuestsElement = cardClone.querySelector('.lodge__rooms-and-guests');

  /** @type {HTMLElement} */
  var offerCheckinTimeElement = cardClone.querySelector('.lodge__checkin-time');

  /** @type {HTMLElement} */
  var offerFeaturesElement = cardClone.querySelector('.lodge__features');

  /** @type {HTMLElement} */
  var offerDescriptionElement = cardClone.querySelector('.lodge__description');

  /** @type {HTMLElement} */
  var offerPhotosElement = cardClone.querySelector('.lodge__photos');

  /** @const {number} */
  var OFFER_IMG_WIDTH = 52;

  /** @const {number} */
  var OFFER_IMG_HEIGHT = 42;

  /**
   * @param {Object} data
   * @return {HTMLElement}
   */
  return function (data) {
    cardAvatarElement.src = data.author.avatar;
    offerTitleElement.innerText = data.offer.title;
    offerAddressElement.innerText = data.offer.address;
    offerPriceElement.innerText = data.offer.price + ' ₽/ночь';
    offerTypeElement.innerText = data.offer.type;
    offerRoomsAndGuestsElement.innerText = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    offerCheckinTimeElement.innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    offerFeaturesElement.innerHTML = '';
    offerDescriptionElement.innerText = data.offer.description;
    offerPhotosElement.innerHTML = '';

    data.offer.features.forEach(function (item) {
      /** @type {HTMLElement} */
      var featureElement = document.createElement('span');

      featureElement.classList.add('feature__image', 'feature__image--' + item);

      offerFeaturesElement.appendChild(featureElement);
    });

    data.offer.photos.forEach(function (photo) {
      /** @type {HTMLElement} */
      var image = new Image(OFFER_IMG_WIDTH, OFFER_IMG_HEIGHT);

      image.src = photo;
      offerPhotosElement.appendChild(image);
    });

    return cardClone;
  };
})();
