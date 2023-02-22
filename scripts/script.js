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

const popupFullImage = document.querySelector('.popup_type_image-full');
const popupImage = popupFullImage.querySelector('.popup__image');
const popupCaption = popupFullImage.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');
const galleryContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('#gallery-element').content;
let activePopup;

function createCard(item) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__mask-group');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardTitle = card.querySelector('.element__title');
  cardTitle.textContent = item.name;
  card.querySelector('.element__trash').addEventListener('click', function() {
    card.remove();
  });
  cardImage.addEventListener('click', function() {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCaption.textContent = item.name;
    openPopup(popupFullImage);
  });
  return card;
};

function handleOpenEditProfileFormPopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  toggleButtonState(createInputsList(popupEditProfile), popupEditProfile.querySelector(config.submitButtonSelector))
  openPopup(popupEditProfile);
};

function handleOpenAddCardFormPopup() {
  inputCardName.value = '';
  inputCardLink.value = '';
  openPopup(popupAddCard);
};

function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;
  closePopup(popupEditProfile);
};

function handleFormSubmitAddCard(evt) {
  evt.preventDefault();
  galleryContainer.prepend(createCard({
    name: inputCardName.value,
    link: inputCardLink.value
  }));
  closePopup(popupAddCard);
};

popupCloseButtons.forEach(item => {
  item.addEventListener('click', () => {
    const popup = item.closest('.popup');
    closePopup(popup);
  });
});

function openPopup(popup) {
  activePopup = popup;
  removeValidationErrors(popup);
  toggleButtonState(createInputsList(popup), popup.querySelector(config.submitButtonSelector));
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscapeKeydown);
  popup.addEventListener('mousedown', closePopupOnOverlaymMousedown)
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

const hadleLikeEvent = (event) => {
  if (event.target.classList.contains('element__like')) {
    event.target.classList.toggle('element__like_active');
  }
};

const closePopupOnEscapeKeydown = (event) => {
  if (event.key === 'Escape') {
    closePopup(activePopup);
    document.removeEventListener('keydown', closePopupOnEscapeKeydown);
  }
};

const closePopupOnOverlaymMousedown = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(activePopup);
    event.target.removeEventListener('mousedown', closePopupOnOverlaymMousedown);
    activePopup = undefined;
  };
};

buttonEditProfile.addEventListener('click', handleOpenEditProfileFormPopup);

buttonAddCard.addEventListener('click', handleOpenAddCardFormPopup);

popupProfileForm.addEventListener('submit', handleFormSubmitEditProfile);

popupCardForm.addEventListener('submit', handleFormSubmitAddCard);

galleryContainer.addEventListener('click', hadleLikeEvent);

initialCards.forEach(function (item) {
  galleryContainer.append(createCard(item));
});
