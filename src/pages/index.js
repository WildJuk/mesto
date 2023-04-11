import './index.css';

import { userInfoSelectors, config, gallerySelectors } from '../utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const userAvatar = document.querySelector('.profile__avatar-container');
let userId = '';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '87e35105-7976-45ad-9045-8a62b10cba0c',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.userNameSelector,
  aboutSelector: userInfoSelectors.userAboutSelector,
  avatarSelector: userInfoSelectors.userAvatarSelector
 });

const cardsList = new Section(
  {
    renderer: (data) => {
      cardsList.addItem(createCard(data, gallerySelectors.elementSelector));
    }
  },
  gallerySelectors.containerSelector
);
const popupFullImage = new PopupWithImage('.popup_type_image-full');

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (formData) => {
    api.setUserInfo({
      name: formData.userName,
      about: formData.userAbout
    })
      .then((data) => {
        userInfo.setUserInfo({
          userName: data.name,
          userAbout: data.about,
          userAvatar: data.avatar
        });
        popupEditProfile.close();
      })
      .catch(err =>
        console.log(`Ошибка загрузки новой карточки: ${err}`)
      )
  }
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar-edit',
  handleFormSubmit: (formData) => {
    api.setUserAvatar(formData.userAvatar)
      .then((data) => {
        userInfo.setUserInfo({userAvatar: data.avatar});
        popupEditAvatar.close();
      })
      .catch(err =>
        console.log(`Ошибка загрузки аватара: ${err}`)
      )
  }
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    api.addNewCard({
      name: formData['card-name'],
      link: formData['card-link']
    })
      .then((data) => {
        cardsList.addItem(createCard(data, gallerySelectors.elementSelector));
        popupAddCard.close();
      })
      .catch(err =>
        console.log(`Ошибка загрузки новой карточки: ${err}`)
      )

  }
});

popupFullImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddCard.setEventListeners();

function createCard(data, template) {
  const newCard = new Card({
    data,
    handleCardClick: () => {
      popupFullImage.open(data);
    },
    handleDeleteButtonClick: (card) => {
      api.deleteCard(card.getCardId())
        .then(() => {
          card.deleteCard();
        })
        .catch(err =>
          console.log(`Ошибка удаления карточки: ${err}`)
        )
    },
    userId
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

function handleOpenEditAvatarFormPopup() {
  console.log('click in avatar')
  formValidators['avatar-edit-form'].disableSubmitButton();
  popupEditAvatar.open();
}

buttonEditProfile.addEventListener('click', handleOpenEditProfileFormPopup);

buttonAddCard.addEventListener('click', handleOpenAddCardFormPopup);

userAvatar.addEventListener('click', handleOpenEditAvatarFormPopup)

const formValidators = {};
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


api.getStartAppData()
  .then(([ userData, initialCards ]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      userName: userData.name,
      userAbout: userData.about,
      userAvatar: userData.avatar
    });

    cardsList.renderItems(initialCards);
  })
  .catch(err =>
    console.log(`123Ошибка загрузки данных: ${err}`)
  )
