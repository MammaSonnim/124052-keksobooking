'use strict';

window.showCard = (function () {
  /** @type {HTMLElement} */
  var tokyoElement = document.querySelector('.tokyo');

  /** @type {HTMLElement} */
  var tokyoFilters = document.querySelector('.tokyo__filters-container');

  /** @const {number} */
  var ESCAPE_KEY_CODE = 27;

  /** @type {?Function} */
  var onHideCallback = null;

  /** @type {HTMLElement} */
  var cardCloseBtnElement;

  /** @type {HTMLElement} */
  var currentCard;

  /** @param {MouseEvent} event */
  function cardCloseBtnClickHandler(event) {
    event.preventDefault();
    closeCard();
  }

  /** @param {KeyboardEvent} event */
  function documentKeydownHandler(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      closeCard();
    }
  }

  /** добавление слушаетелей */
  function addEventListeners() {
    document.addEventListener('keydown', documentKeydownHandler);
    cardCloseBtnElement.addEventListener('click', cardCloseBtnClickHandler);
  }

  /** удаление слушаетелей */
  function removeEventListeners() {
    document.removeEventListener('keydown', documentKeydownHandler);
    cardCloseBtnElement.removeEventListener('click', cardCloseBtnClickHandler);
  }

  /** Поведение при закрытии диалога — скрытие модального окна и деактивация пина */
  function closeCard() {
    if (currentCard) {
      currentCard.remove();
      currentCard = null;
      removeEventListeners();
      onHideCallback();
    }
  }

  return {
    /**
     * @param {Object} data данные карточки
     * @param {Function=} optOnHideCallback
     */
    open: function (data, optOnHideCallback) {
      /** @type {HTMLElement} */
      var newCard = window.renderCard(data);

      if (currentCard) {
        removeEventListeners();
        currentCard.remove();
      }

      tokyoElement.insertBefore(newCard, tokyoFilters);

      currentCard = newCard;
      cardCloseBtnElement = currentCard.querySelector('.dialog__close');

      addEventListeners();

      if (typeof optOnHideCallback === 'function') {
        onHideCallback = optOnHideCallback;
      }
    },
    close: closeCard
  };
})();
