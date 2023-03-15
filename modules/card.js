import { openPopup } from "./script.js";

export class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._cardElement = this._createCard();
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._setEventListeners();
  }

  _createCard() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__mask-group');
    const cardTitle = card.querySelector('.element__title');
    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardTitle.textContent = this._cardData.name;
    return card;
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _clickLike() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _cratePreview() {
    const popupFullImage = document.querySelector('.popup_type_image-full');
    const popupImage = popupFullImage.querySelector('.popup__image');
    const popupCaption = popupFullImage.querySelector('.popup__caption');
    popupImage.src = this._cardData.link;
    popupImage.alt = this._cardData.name;
    popupCaption.textContent = this._cardData.name;
    openPopup(popupFullImage);
  }

  _setEventListeners() {
    const buttonDelete = this._cardElement.querySelector('.element__trash');
    const cardImage = this._cardElement.querySelector('.element__mask-group');

    this._buttonLike.addEventListener('click', () => this._clickLike());
    buttonDelete.addEventListener('click', () => this._deleteCard());
    cardImage.addEventListener('click', () => this._cratePreview());
  }

  getCard() {
    return this._cardElement
  }
}
