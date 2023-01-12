let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');

function openEditFormPopup() {
  let profileName =  document.querySelector('.profile__name');
  let profileJob =  document.querySelector('.profile__job');
  let inputName = popupForm.querySelector('.popup__name-input');
  let inputJob = popupForm.querySelector('.popup__job-input');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
};

function closeEditFormPopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  let profileName =  document.querySelector('.profile__name');
  let profileJob =  document.querySelector('.profile__job');
  let inputName = popupForm.querySelector('.popup__name-input');
  let inputJob = popupForm.querySelector('.popup__job-input');
  if(inputName.value !== '') {
    profileName.textContent = inputName.value;
    profileName.title = inputName.value;
  }
  if(inputJob.value !== '') {
    profileJob.textContent = inputJob.value;
    profileJob.title = inputJob.value;
  }
  closeEditFormPopup();
};

editButton.addEventListener('click', openEditFormPopup);

popupCloseButton.addEventListener('click', closeEditFormPopup);

popupForm.addEventListener('submit', handleFormSubmit);

