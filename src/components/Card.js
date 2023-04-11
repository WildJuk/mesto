export class Card {
  constructor({data, handleCardClick, handleDeleteButtonClick, userId} , templateSelector) {
    this._cardData = data;
    this._userId = userId;
    this._card =
      document.querySelector(templateSelector).content
      .querySelector('.element').cloneNode(true);
    this._cardImage = this._card.querySelector('.element__mask-group');
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardElement = this._createCard();
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._buttonDelete = this._cardElement.querySelector('.element__trash');
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._setEventListeners();
  }

  _createCard() {
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardTitle.textContent = this._cardData.name;
    return this._card;
  }


  deleteCard() {
    this._cardElement.remove();
  }

  getCardId() {
    return this._cardData._id
  }

  _clickLike() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._clickLike());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteButtonClick(this));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._cardData.name,
        link: this._cardData.link
      })
    });
  }

  getCard() {
    if(this._cardData.owner._id !== this._userId) {
      this._buttonDelete.classList.add('element__trash_hidden');
    }
    return this._cardElement
  }
}
