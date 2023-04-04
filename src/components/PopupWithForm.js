import { Popup } from './Popup.js';
import { config } from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(config.formSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputsList = this._popupForm.querySelectorAll(config.inputSelector);
    const formValues = {};
    inputsList.forEach((input) => {
      formValues[input.name] = input.value
    });
    return formValues;
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
