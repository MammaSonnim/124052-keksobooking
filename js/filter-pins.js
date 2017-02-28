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

  /** @const {string} */
  var ANY_VALUE = 'any';

  /**
   * @readonly
   * @enum {string}
   */
  var priceFilterRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    ANY: ANY_VALUE
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
   * @param {string} type
   * @param {string} typeFilterValue
   * @return {boolean}
   */
  function filterByApartmentType(type, typeFilterValue) {
    return typeFilterValue === type || typeFilterValue === ANY_VALUE;
  }

  /**
   * @param {number} price
   * @param {string} priceFilterValue
   * @return {boolean}
   */
  function filterByApartmentPrice(price, priceFilterValue) {
    switch (priceFilterValue) {
      case (priceFilterRange.LOW):
        return price < priceFilterBounds.MIN;
      case (priceFilterRange.MIDDLE):
        return price >= priceFilterBounds.MIN && price <= priceFilterBounds.MAX;
      case (priceFilterRange.HIGH):
        return price > priceFilterBounds.MAX;
      case (priceFilterRange.ANY):
        return true;
    }

    return false;
  }

  /**
   * @param {number} rooms
   * @param {number|string} roomsFilterValue
   * @return {boolean}
   */
  function filterByRoomNumber(rooms, roomsFilterValue) {
    return parseInt(roomsFilterValue, 10) === rooms || roomsFilterValue.toString() === ANY_VALUE;
  }

  /**
   * @param {number} guests
   * @param {number|string} guestsFilterValue
   * @return {boolean}
   */
  function filterByGuestsNumber(guests, guestsFilterValue) {
    return parseInt(guestsFilterValue, 10) === guests || guestsFilterValue.toString() === ANY_VALUE;
  }

  /**
   * @param {Array} features
   * @param {NodeList} featuresFilter
   * @return {boolean}
   */
  function filterByFeatures(features, featuresFilter) {
    return ![].some.call(featuresFilter, function (featureFilter) {
      return featureFilter.checked && !features.includes(featureFilter.value);
    });
  }

  /**
   * @param {Object} apartment объект с данными
   * @return {boolean} оставить или нет объект после применения всех фильтров
   */
  function filterByAllParams(apartment) {
    return filterByApartmentType(apartment.offer.type, filterTypeElement.value) &&
      filterByApartmentPrice(parseInt(apartment.offer.price, 10), filterPriceElement.value) &&
      filterByRoomNumber(parseInt(apartment.offer.rooms, 10), filterRoomNumberElement.value) &&
      filterByGuestsNumber(parseInt(apartment.offer.guests, 10), filterGuestsNumberElement.value) &&
      filterByFeatures(apartment.offer.features, filterFeatureElements);
  }

  /**
   * @param {Array} apartments исходный массив
   * @return {Array} отфильтрованный массив
   */
  return function (apartments) {
    return apartments.filter(filterByAllParams);
  };
})();
