let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');

function getProfileInfo() {
  return {
    name: document.querySelector('.profile__name'),
    job: document.querySelector('.profile__job'),
  }
};

function getPopupFormInputs() {
  return {
    name: popupForm.querySelector('.popup__name-input'),
    job: popupForm.querySelector('.popup__job-input'),
  }
};

function openEditFormPopup() {
  getPopupFormInputs().name.value = getProfileInfo().name.textContent;
  getPopupFormInputs().job.value = getProfileInfo().job.textContent;
  popup.classList.add('popup_opened');
};

function closeEditFormPopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  let inputsValues = getPopupFormInputs();
  if(inputsValues.name.value !== '') {
    getProfileInfo().name.textContent = inputsValues.name.value;
    getProfileInfo().name.title = inputsValues.name.value;
  }
  if(inputsValues.job.value !== '') {
    getProfileInfo().job.textContent = inputsValues.job.value;
    getProfileInfo().job.title = inputsValues.job.value;
  }
  closeEditFormPopup();
};

function keyUpEvent(evt) {
  if(evt.code === 13) {
    handleFormSubmit();
  }
};

editButton.addEventListener('click', openEditFormPopup);

popupCloseButton.addEventListener('click', closeEditFormPopup);

popupForm.addEventListener('submit', handleFormSubmit);

window.addEventListener('keyup', keyUpEvent);

