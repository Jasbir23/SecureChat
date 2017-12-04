import React, { Component } from "react";
import { DrawerNavigator } from "react-navigation";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import MyChats from "../MyChats/MyChats";
import ChatScreen from "../ChatScreen/ChatScreen";
import LoginSignUp from "../LoginSignUp/LoginSignUp";
import FindChat from "../FindChat/FindChat";
import { StackNavigator } from "react-navigation";
const MainStack = StackNavigator(
  {
    LoginSignUp: { screen: LoginSignUp },
    MyChats: { screen: MyChats },
    FindChat: { screen: FindChat },
    ChatScreen: { screen: ChatScreen }
  },
  { headerMode: "none" }
);
export default MainStack;
