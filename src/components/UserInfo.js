export class UserInfo {
  constructor({ username, userjob, avatar }) {
    this._username = document.querySelector(username);
    this._userjob = document.querySelector(userjob);
    this._avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }
    return userInfo
  }



  setUserInfo(data) {
    this._username.textContent = data.username;
    this._job.textContent = data.userjob;
    this._avatar.src = data.avatar;
  }


}