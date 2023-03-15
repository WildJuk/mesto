import { initialCards } from './initial-cards.js'
import { Card } from './card.js';
import { FormValidator } from './form-validator.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const popupProfileForm = popupEditProfile.querySelector('.popup__form_type_edit');
const profileName =  document.querySelector('.profile__name');
const profileJob =  document.querySelector('.profile__job');
const inputProfileName = popupProfileForm.querySelector('.popup__input_name_profile-name');
const inputProfileJob = popupProfileForm.querySelector('.popup__input_name_profile-job');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupCardForm = popupAddCard.querySelector('.popup__form_type_add');
const inputCardName = popupAddCard.querySelector('.popup__input_name_card-name');
const inputCardLink = popupAddCard.querySelector('.popup__input_name_card-link');

const galleryContainer = document.querySelector('.elements__container');
const popupList = Array.from(document.querySelectorAll('.popup'));

const profileFormValidator = new FormValidator(config, popupProfileForm);
const cardAddFormValidator = new FormValidator(config, popupCardForm);
cardAddFormValidator.enableValidation();
profileFormValidator.enableValidation();

popupList.forEach(popup => {
  popup.addEventListener('mousedown', (event) => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

function handleOpenEditProfileFormPopup() {
  popupProfileForm.reset();
  profileFormValidator.enableSubmitButton();
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  openPopup(popupEditProfile);
};

function handleOpenAddCardFormPopup() {
  popupCardForm.reset();
  cardAddFormValidator.disableSubmitButton();
  openPopup(popupAddCard);
};

function handleFormSubmitEditProfile() {
  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;
  closePopup(popupEditProfile);
};

function handleFormSubmitAddCard() {
  const card = new Card({
    name: inputCardName.value,
    link: inputCardLink.value
  }, '#gallery-element')
  galleryContainer.prepend(card.getCard());
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
  const popupOpened = document.querySelector('.popup_opened');
  if (!!popupOpened && event.key === 'Escape') {
    closePopup(popupOpened);
  }
};

buttonEditProfile.addEventListener('click', handleOpenEditProfileFormPopup);

buttonAddCard.addEventListener('click', handleOpenAddCardFormPopup);

popupProfileForm.addEventListener('submit', handleFormSubmitEditProfile);

popupCardForm.addEventListener('submit', handleFormSubmitAddCard);

initialCards.forEach(function (item) {
  const card = new Card(item, '#gallery-element')
  galleryContainer.append(card.getCard());
});
