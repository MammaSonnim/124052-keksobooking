'use strict';

window.showCard = (function () {
  /** @type {HTMLElement} */
  var tokyoElement = document.querySelector('.tokyo');

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
    currentCard.remove();
    currentCard = null;
    removeEventListeners();
    onHideCallback();
  }

  /**
   * @param {Object} data данные карточки
   * @param {Function=} optOnHideCallback
   */
  return function (data, optOnHideCallback) {
    /** @type {HTMLElement} */
    var newCard = window.renderCard(data);

    if (currentCard) {
      removeEventListeners();
      currentCard.remove();
    }

    tokyoElement.appendChild(newCard);

    currentCard = newCard;
    cardCloseBtnElement = currentCard.querySelector('.dialog__close');

    addEventListeners();

    onHideCallback = optOnHideCallback || function () {
      throw new Error('no callback');
    };
  };
})();
