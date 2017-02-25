'use strict';

window.filterOffers = (function () {
  /** @type {HTMLElement} */
  var filtersForm = document.querySelector('.tokyo__filters');

  /** @type {HTMLElement} */
  var filterTypeElement = filtersForm.querySelector('#housing_type');

  /** @type {HTMLElement} */
  var filterPriceElement = filtersForm.querySelector('#housing_price');

  /** @type {HTMLElement} */
  var filterRoomNumberElement = filtersForm.querySelector('#housing_room-number');

  /** @type {HTMLElement} */
  var filterGuestsNumberElement = filtersForm.querySelector('#housing_guests-number');

  /** @type {NodeList} */
  var filterFeatureElements = filtersForm.querySelectorAll('input[type="checkbox"]');

  /**
   * @param {string} type
   * @return {boolean}
   */
  function compareApartmentType(type) {
    /** @type {string} */
    var value = filterTypeElement.value;

    return value === type || value === 'any';
  }

  /**
   * @readonly
   * @enum {string}
   */
  var priceString = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  /**
   * @readonly
   * @enum {number}
   */
  var priceNumber = {
    MIN: 10000,
    MAX: 50000
  };

  /**
   * @param {string} price
   * @return {boolean}
   */
  function compareApartmentPrice(price) {
    /** @type {string} */
    var value = filterPriceElement.value;

    switch (value) {
      case (priceString.LOW):
        return price < priceNumber.MIN;
      case (priceString.MIDDLE):
        return price >= priceNumber.MIN && price <= priceNumber.MAX;
      case (priceString.HIGH):
        return price > priceNumber.MAX;
    }

    return false;
  }

  /**
   * @param {string} rooms
   * @return {boolean}
   */
  function compareRoomNumber(rooms) {
    /** @type {string} */
    var value = filterRoomNumberElement.value;

    return value === rooms.toString() || value === 'any';
  }

  /**
   * @param {string} guests
   * @return {boolean}
   */
  function compareGuestsNumber(guests) {
    /** @type {string} */
    var value = filterGuestsNumberElement.value;

    return value === guests.toString() || value === 'any';
  }

  /**
   * @param {string} features
   * @return {boolean} flag
   */
  function compareFeatures(features) {
    /** @type {boolean} */
    var flag = true;

    [].forEach.call(filterFeatureElements, function (featureInFilter) {
      if (featureInFilter.checked) {
        if (!(features.includes(featureInFilter.value))) {
          flag = false;
          return flag;
        }
      }
    });

    return flag;
  }

  /**
   * @param {Array} apartments исходный массив
   * @return {Array} отфильтрованный массив
   */
  return function (apartments) {
    return apartments.filter(function (apartment) {
      return compareApartmentType(apartment.offer.type) &&
        compareApartmentPrice(apartment.offer.price) &&
        compareRoomNumber(apartment.offer.rooms) &&
        compareGuestsNumber(apartment.offer.guests) &&
        compareFeatures(apartment.offer.features);
    });
  };
})();
