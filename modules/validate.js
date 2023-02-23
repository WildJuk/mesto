const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, inputList, buttonElement, config) => {
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const inputList = createInputsList(formElement, config);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formElement.addEventListener('reset', function (evt) {
      removeValidationErrors(formElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });

    setEventListeners(formElement, inputList, buttonElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
};

const createInputsList = (formElement, config) => {
 return Array.from(formElement.querySelectorAll(config.inputSelector))
};

const removeValidationErrors = (formElement, config) => {
  const listInputs = createInputsList(formElement, config);
  listInputs.forEach(input => {
    hideInputError(formElement, input, config);
  });
};

const enableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

const disableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

enableValidation(config);
