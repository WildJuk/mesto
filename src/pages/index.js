import './index.css';

import { userInfoSelectors, initialCards, config, gallerySelectors } from '../utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';

// Кнопки открытия попапов с формой
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.userNameSelector,
  aboutSelector: userInfoSelectors.userAboutSelector,
 });

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardsList.addItem(createCard(data, gallerySelectors.elementSelector));
    }
  },
  gallerySelectors.containerSelector
);
const popupFullImage = new PopupWithImage('.popup_type_image-full');

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  }
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {
    cardsList.addItem(createCard({
      name: data['card-name'],
      link: data['card-link']
    }, gallerySelectors.elementSelector));
    popupAddCard.close();
  }
});

cardsList.renderItems();
popupFullImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

function createCard(data, template) {
  const newCard = new Card({
    data,
    handleCardClick: () => {
      popupFullImage.open(data);
    }
  }, template);
  return newCard.getCard();
};

function handleOpenEditProfileFormPopup() {
  formValidators['profile-edit-form'].disableSubmitButton();
  const currentUserInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues({
    userName: currentUserInfo.userName,
    userAbout: currentUserInfo.userAbout
  });
  popupEditProfile.open();
};

function handleOpenAddCardFormPopup() {
  formValidators['card-add-form'].disableSubmitButton();
  popupAddCard.open();
};

buttonEditProfile.addEventListener('click', handleOpenEditProfileFormPopup);

buttonAddCard.addEventListener('click', handleOpenAddCardFormPopup);

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

enableValidation(config);
