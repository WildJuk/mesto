import { Popup } from "./Popup.js";
import { config } from "../utils/constants.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector(config.formSelector);
  }

  setHandleDeleteClick(handleCardDelete) {
    this._handleCardDelete = handleCardDelete;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', () => {
      this._handleCardDelete();
    });
    super.setEventListeners();
  }
}
