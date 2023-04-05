import { Popup } from './Popup.js';
import { config } from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(config.formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputsList = this._popupForm.querySelectorAll(config.inputSelector);
  }

  _getInputValues() {
    const formValues = {};
    this._inputsList.forEach((input) => {
      formValues[input.name] = input.value
    });
    return formValues;
  }

  setInputValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
