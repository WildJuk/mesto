import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open({link, name}) {
    const popupImage = this._popup.querySelector('.popup__image');
    const popupCaption = this._popup.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    super.open();
  }
}
