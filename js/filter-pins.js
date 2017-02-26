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
  function filterByApartmentType(type, typeFilterValue) {
    return typeFilterValue === type || typeFilterValue === 'any';
  }

  /**
   * @readonly
   * @enum {string}
   */
  var priceFilterRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    ANY: 'any'
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
    return +roomsFilterValue === rooms || roomsFilterValue === 'any';
  }

  /**
   * @param {number} guests
   * @param {number|string} guestsFilterValue
   * @return {boolean}
   */
  function filterByGuestsNumber(guests, guestsFilterValue) {
    return +guestsFilterValue === guests || guestsFilterValue === 'any';
  }

  /**
   * @param {Array} features
   * @param {NodeList} featuresFilter
   * @return {boolean} flag
   */
  function filterByFeatures(features, featuresFilter) {
    /** @type {boolean} */
    var flag = true;

    [].some.call(featuresFilter, function (featureFilter) {
      if (featureFilter.checked && !(features.includes(featureFilter.value))) {
        flag = false;
      }
    });

    return flag;
  }

  /**
   * @param {Object} apartment объект с данными
   * @return {boolean} оставить или нет объект после применения всех фильтров
   */
  function filterByAllParams(apartment) {
    return filterByApartmentType(apartment.offer.type, filterTypeElement.value) &&
      filterByApartmentPrice(+apartment.offer.price, filterPriceElement.value) &&
      filterByRoomNumber(+apartment.offer.rooms, filterRoomNumberElement.value) &&
      filterByGuestsNumber(+apartment.offer.guests, filterGuestsNumberElement.value) &&
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
