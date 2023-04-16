export const userInfoSelectors = {
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
}

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const gallerySelectors = {
  containerSelector: '.elements__container',
  elementSelector: '.gallery-element'
}

export const popupsSelectors = {
  popupEditForm: '.popup_type_profile-edit',
  popupEditAvatar: '.popup_type_avatar-edit',
  popupAddCard: '.popup_type_add-card',
  popupFullImage: '.popup_type_image-full',
  popupDeleteCard: '.popup_type_delete-card'
}
