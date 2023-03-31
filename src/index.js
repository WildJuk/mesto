import './pages/index.css';

import { userInfoSelectors, initialCards, config, gallerySelectors } from './utils/constants.js';
import { UserInfo } from './components/UserInfo.js';
import { Section } from './components/Section.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';

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
const inputProfileName = popupProfileForm.querySelector('.popup__input_name_profile-name');
const inputProfileJob = popupProfileForm.querySelector('.popup__input_name_profile-job');

// Инпуты формы добавления карточки
const inputCardName = popupAddCard.querySelector('.popup__input_name_card-name');
const inputCardLink = popupAddCard.querySelector('.popup__input_name_card-link');

// Массив со всеми формами
const popupList = Array.from(document.querySelectorAll('.popup'));

const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.userNameSelector,
  aboutSelector: userInfoSelectors.userAboutSelector,
 });

const cardsList = new Section(
  {
    renderer: (data) => {
      cardsList.addItem(createCard(data, gallerySelectors.elementSelector));
    }
  },
  gallerySelectors.containerSelector
);

cardsList.renderItems(initialCards);

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
  const currentUserInfo = userInfo.getUserInfo();
  inputProfileName.value = currentUserInfo.userName;
  inputProfileJob.value = currentUserInfo.userAbout;
  openPopup(popupEditProfile);
};

function handleOpenAddCardFormPopup() {
  popupCardForm.reset();
  formValidators['card-add-form'].disableSubmitButton();
  openPopup(popupAddCard);
};

function handleFormSubmitEditProfile() {
  userInfo.setUserInfo({
    userName: inputProfileName.value,
    userAbout: inputProfileJob.value
  });
  closePopup(popupEditProfile);
};

function handleFormSubmitAddCard() {
  const card = createCard({
    name: inputCardName.value,
    link: inputCardLink.value
  }, gallerySelectors.elementSelector);
  cardsList.addItem(card);
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
