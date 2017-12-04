import React from "react";
import PageSwitchBackGroundAnims from "../Animations3T/main/PageSwitchBackGroundAnims";
import { NavigationActions } from "react-navigation";
import { Animated, Dimensions } from "react-native";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegisterationForm";
import MainStore from "../MainStore/MainStore";
let { width } = Dimensions.get("window");
import { observer } from "mobx-react/native";

@observer
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    MainStore.refreshAllData();
  }
  _buttonPress() {
    console.log("End");
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "MyChats"
          })
        ]
      })
    );
  }
  render() {
    return (
      <PageSwitchBackGroundAnims
        containerStyle={{ backgroundColor: "#000" }}
        backgroundImage={require("../Assets/bg.jpg")}
        logo={require("../Assets/logo.png")}
        logoStyle={{ marginBottom: 30 }}
        lgDecorColorArray={[
          ["rgba(168, 194, 237,0.5)", "rgba(42, 41, 48,0.5)"],
          ["rgba(185, 184, 188,0.3)", "rgba(5, 17, 58,0.5)"]
        ]}
        switchButtonColor1="rgb(24, 27, 35)"
        switchButtonColor2="rgb(24, 27, 35)"
        smDecorColor="#ccc"
        dimensionsSmDecor={50}
        dimensionsLgDecor={450}
        noOfDecors={6}
        page1SwitchText="Login"
        page2SwitchText="Register"
        page1={
          <LoginForm
            usernameChange={event => {
              console.log(event.nativeEvent.text);
            }}
            passwordChange={event => {
              console.log(event.nativeEvent.text);
            }}
            onPressSubmit={this._buttonPress.bind(this)}
            color="black"
          />
        }
        page2={
          <RegistrationForm
            usernameChange={event => console.log(event.nativeEvent.text)}
            passwordChange={event => console.log(event.nativeEvent.text)}
            confirmPasswordChange={event => console.log(event.nativeEvent.text)}
            emailChange={event => console.log(event.nativeEvent.text)}
            onPressSubmit={this._buttonPress.bind(this)}
            color="black"
          />
        }
      />
    );
  }
}
