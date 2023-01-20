export  class UserInfo {
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

  setUserInfo({ username, userjob }) {
    this._username.textContent = username;
    this._userjob.textContent = userjob;

  }

}