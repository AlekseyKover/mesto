export class UserInfo {
  constructor({ username, userjob }) {
    this._username = document.querySelector(username);
    this._userjob = document.querySelector(userjob);

  }
  getUserInfo() {
    return {
      username: this._username.textContent,
      userjob: this._userjob.textContent
    };
  }

  setUserInfo(data) {
    this._username.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }






}