import * as firebase from "firebase";
import { observable } from "mobx";

class MainStore {
  @observable allUsers = undefined;
  @observable currentUser = undefined;
  @observable chatUser = undefined;
  @observable chatUser = undefined;

  setChatUser(state) {
    this.chatUser = state;
  }
  setAllUsers(state) {
    this.allUsers = state;
  }
  setCurrentUser(data) {
    this.currentUser = data;
  }
  refreshAllData() {
    firebase
      .database()
      .ref("Users/")
      .once("value", snapshot => {
        if (snapshot !== undefined) {
          console.log(snapshot.val());
          this.setAllUsers(snapshot.val());
        }
      });
  }
}
export default new MainStore();
