import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/Login/Login";
import SignUp from "./src/SignUp/SignUp";
import MyChats from "./src/MyChats/MyChats";
import ChatScreen from "./src/ChatScreen/ChatScreen";
import FindChat from "./src/FindChat/FindChat";
import LoginSignUp from "./src/LoginSignUp/LoginSignUp";
import StackRouter from "./src/StackRouter/MainStack";
import * as firebase from "firebase";
import MainStore from "./src/MainStore/MainStore";

var config = {
  apiKey: "AIzaSyBMsj5JpcIQECXUGtUNp_EJmxMgBo5dtIQ",
  authDomain: "chat-f9f63.firebaseapp.com",
  databaseURL: "https://chat-f9f63.firebaseio.com",
  projectId: "chat-f9f63",
  storageBucket: "",
  messagingSenderId: "454441712501"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    MainStore.refreshAllData();
    this.setState({
      isReady: true
    });
  }
  render() {
    if (!this.state.isReady) {
      return <View style={{ flex: 1 }} />;
    }
    return <StackRouter />;
  }
}
