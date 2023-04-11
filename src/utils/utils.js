export const renderLoading = (popupSelector, isLoading) => {
  const buttonInActivePopup = document.querySelector(`${popupSelector} .popup__submit-button`);
  const buttonText = buttonInActivePopup.textContent;
  if(isLoading) {
    buttonInActivePopup.textContent = 'Сохранение...';
  } else {
    buttonInActivePopup.textContent = 'Сохранить';
  }
};
