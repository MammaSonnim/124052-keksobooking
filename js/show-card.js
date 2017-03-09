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

  /** @type {HTMLElement} */
  var cardImgElement;

  /** @type {Object} */
  var startPoint;

  /** @type {boolean} */
  var isDragging = false;

  // cardImgElement = document.querySelector('.dialog__title img');

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

  /** @param {MouseEvent} event */
  var cardImgMousedownHandler = function (event) {
    onMouseDown(event);
  };

  /** @param {MouseEvent} event */
  var documentMousemoveHandler = function (event) {
    onMouseMove(event, currentCard);
  };

  /** @param {MouseEvent} event */
  var documentMouseupHandler = function (event) {
    onMouseUp();
  };

  /** добавление слушаетелей */
  function addEventListeners() {
    document.addEventListener('keydown', documentKeydownHandler);
    cardCloseBtnElement.addEventListener('click', cardCloseBtnClickHandler);
    cardImgElement.addEventListener('mousedown', cardImgMousedownHandler);
  }

  /** удаление слушаетелей */
  function removeEventListeners() {
    document.removeEventListener('keydown', documentKeydownHandler);
    cardCloseBtnElement.removeEventListener('click', cardCloseBtnClickHandler);
    cardImgElement.removeEventListener('mousedown', cardImgMousedownHandler);
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

  /**
   * Навешиваются обработчики на движение и отпускание клавиши мыши
   * @param {MouseEvent} event
   */
  function onMouseDown(event) {
    event.preventDefault();

    if (isDragging) {
      onMouseUp();
    }

    isDragging = true;

    startPoint = {
      x: event.clientX,
      y: event.clientY
    };

    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  }

  /**
   * Рассчет позиции элемента при движении мыши
   * @param {MouseEvent} event
   * @param {HTMLElement} target
   */
  function onMouseMove(event, target) {
    event.preventDefault();

    var shift = {
      x: startPoint.x - event.clientX,
      y: startPoint.y - event.clientY
    };

    target.style.top = (target.offsetTop - shift.y) + 'px';
    target.style.left = (target.offsetLeft - shift.x) + 'px';

    startPoint = {
      x: event.clientX,
      y: event.clientY
    };
  }

  /** Снимаются обработчики на движение и отпускание клавиши мыши */
  function onMouseUp() {
    document.removeEventListener('mousemove', documentMousemoveHandler);
    document.removeEventListener('mouseup', documentMouseupHandler);

    isDragging = false;
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
      cardImgElement = currentCard.querySelector('img');

      addEventListeners();

      if (typeof optOnHideCallback === 'function') {
        onHideCallback = optOnHideCallback;
      }
    },
    close: closeCard
  };
})();
