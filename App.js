import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GetStarted from "./src/GetStarted/GetStarted";
import Login from "./src/Login/Login";
import SignUp from "./src/SignUp/SignUp";
import MyChats from "./src/MyChats/MyChats";
import ChatScreen from "./src/ChatScreen/ChatScreen";

export default class App extends React.Component {
  render() {
    return <ChatScreen />;
  }
}
