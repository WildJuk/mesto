import { initialCards } from './initial-cards.js'
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Попапы
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupFullImage = document.querySelector('.popup_type_image-full');

// Формы
const popupProfileForm = document.forms['profile-edit-form'];
const popupCardForm = document.forms['card-add-form'];

// Кнопки открытия попапов с формой
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

// DOM элементы профиля пользователя и инпуты формы редактирования
const profileName =  document.querySelector('.profile__name');
const profileJob =  document.querySelector('.profile__job');
const inputProfileName = popupProfileForm.querySelector('.popup__input_name_profile-name');
const inputProfileJob = popupProfileForm.querySelector('.popup__input_name_profile-job');

// Инпуты формы добавления карточки
const inputCardName = popupAddCard.querySelector('.popup__input_name_card-name');
const inputCardLink = popupAddCard.querySelector('.popup__input_name_card-link');

// Контейнер содержащий карточки
const galleryContainer = document.querySelector('.elements__container');

// Массив со всеми формами
const popupList = Array.from(document.querySelectorAll('.popup'));

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function createCard(card, template) {
  const newCard = new Card(card, template, handleCardClick);
  return newCard.getCard();
};

function renderCards(card) {
  galleryContainer.prepend(card);
}

enableValidation(config);

popupList.forEach(popup => {
  popup.addEventListener('mousedown', (event) => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

function handleCardClick(name, link) {
  const popupImage = popupFullImage.querySelector('.popup__image');
  const popupCaption = popupFullImage.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupFullImage);
}

function handleOpenEditProfileFormPopup() {
  popupProfileForm.reset();
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  openPopup(popupEditProfile);
};

function handleOpenAddCardFormPopup() {
  popupCardForm.reset();
  formValidators['card-add-form'].disableSubmitButton();
  openPopup(popupAddCard);
};

function handleFormSubmitEditProfile() {
  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;
  closePopup(popupEditProfile);
};

function handleFormSubmitAddCard() {
  const card = createCard({
    name: inputCardName.value,
    link: inputCardLink.value
  }, '#gallery-element');
  renderCards(card);
  closePopup(popupAddCard);
  popupCardForm.reset();
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscapeKeydown);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscapeKeydown);
};

const closePopupOnEscapeKeydown = (event) => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    !!popupOpened && closePopup(popupOpened);
  }
};

buttonEditProfile.addEventListener('click', handleOpenEditProfileFormPopup);

buttonAddCard.addEventListener('click', handleOpenAddCardFormPopup);

popupProfileForm.addEventListener('submit', handleFormSubmitEditProfile);

popupCardForm.addEventListener('submit', handleFormSubmitAddCard);

initialCards.forEach(function (item) {
  const card = createCard(item, '#gallery-element');
  renderCards(card);
});
