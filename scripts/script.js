let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');
let profileName =  document.querySelector('.profile__name');
let profileJob =  document.querySelector('.profile__job');
let inputName = popupForm.querySelector('.popup__input_name_profile-name');
let inputJob = popupForm.querySelector('.popup__input_name_profile-job');

function openEditFormPopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
};

function closeEditFormPopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileName.title = inputName.value;
  profileJob.textContent = inputJob.value;
  profileJob.title = inputJob.value;
  closeEditFormPopup();
};

editButton.addEventListener('click', openEditFormPopup);

popupCloseButton.addEventListener('click', closeEditFormPopup);

popupForm.addEventListener('submit', handleFormSubmit);

