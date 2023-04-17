export class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._nameElement.textContent,
      userAbout: this._aboutElement.textContent,
      userAvatar: this._avatarElement.src
    }
  }

  setUserInfo({ userName, userAbout, userAvatar }) {
      if(!!userName) {
        this._nameElement.textContent = userName;
      }
      if(!!userAbout) {
        this._aboutElement.textContent = userAbout;
      }
      if(!!userAvatar) {
        this._avatarElement.src = userAvatar;
      }
  }
}
