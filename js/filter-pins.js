'use strict';

window.filterPins = (function () {
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
   * @param {string} typeFilterValue
   * @return {boolean}
   */
  function compareApartmentType(type, typeFilterValue) {
    return typeFilterValue === type || typeFilterValue === 'any';
  }

  /**
   * @readonly
   * @enum {string}
   */
  var priceFilterRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  /**
   * @readonly
   * @enum {number}
   */
  var priceFilterBounds = {
    MIN: 10000,
    MAX: 50000
  };

  /**
   * @param {number} price
   * @param {string} priceFilterValue
   * @return {boolean}
   */
  function compareApartmentPrice(price, priceFilterValue) {
    switch (priceFilterValue) {
      case (priceFilterRange.LOW):
        return +price < priceFilterBounds.MIN;
      case (priceFilterRange.MIDDLE):
        return +price >= priceFilterBounds.MIN && +price <= priceFilterBounds.MAX;
      case (priceFilterRange.HIGH):
        return +price > priceFilterBounds.MAX;
    }

    return false;
  }

  /**
   * @param {number} rooms
   * @param {string} roomsFilterValue
   * @return {boolean}
   */
  function compareRoomNumber(rooms, roomsFilterValue) {
    return +roomsFilterValue === rooms || roomsFilterValue === 'any';
  }

  /**
   * @param {number} guests
   * @param {string} guestsFilterValue
   * @return {boolean}
   */
  function compareGuestsNumber(guests, guestsFilterValue) {
    return +guestsFilterValue === guests || guestsFilterValue === 'any';
  }

  /**
   * @param {Array} features
   * @param {NodeList} featuresFilter
   * @return {boolean} flag
   */
  function compareFeatures(features, featuresFilter) {
    /** @type {boolean} */
    var flag = true;

    [].forEach.call(featuresFilter, function (featureFilter) {
      if (featureFilter.checked && !(features.includes(featureFilter.value))) {
        flag = false;
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
      return compareApartmentType(apartment.offer.type, filterTypeElement.value) &&
        compareApartmentPrice(apartment.offer.price, filterPriceElement.value) &&
        compareRoomNumber(apartment.offer.rooms, filterRoomNumberElement.value) &&
        compareGuestsNumber(apartment.offer.guests, filterGuestsNumberElement.value) &&
        compareFeatures(apartment.offer.features, filterFeatureElements);
    });
  };
})();
