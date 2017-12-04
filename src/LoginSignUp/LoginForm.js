import React from "react";
import { Animated, Dimensions } from "react-native";
import { View, Form, Item, Input, Button, Text, Spinner } from "native-base";
import SubmitButtonWithAnimation from "../Animations3T/main/SubmitButtonWithAnimation";
import MainStore from "../MainStore/MainStore";
let { width } = Dimensions.get("window");
import { observer } from "mobx-react/native";

@observer
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logUserName: "",
      logPassword: "",
      usernameError: "",
      passwordError: "",
      passDisabled: true,
      submitDisabled: true
    };
  }
  textChange() {
    this.setState({
      usernameError: "Incorrect username",
      passDisabled: true,
      submitDisabled: true,
      passwordError: ""
    });
    Object.keys(MainStore.allUsers).map((item, index) => {
      console.log(this.state.logUserName, MainStore.allUsers[item].username);
      if (MainStore.allUsers[item].username === this.state.logUserName) {
        this.setState({
          passDisabled: false,
          submitDisabled: true,
          usernameError: ""
        });
        console.log("hdasjhkj");
        if (MainStore.allUsers[item].password === this.state.logPassword) {
          this.setState({
            passwordError: "",
            submitDisabled: false
          });
        } else if (
          MainStore.allUsers[item].password !== this.state.logPassword
        ) {
          this.setState({
            passwordError: "Incorrect password",
            submitDisabled: true
          });
        }
      }
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Form>
          <Text style={{ fontSize: 15, color: "red" }}>
            {this.state.usernameError}
          </Text>
          <Item
            style={{
              backgroundColor: "transparent",
              width: "100%"
            }}
          >
            <Input
              style={{
                backgroundColor: "rgb(56, 56, 58)",
                borderWidth: 1,
                borderColor:
                  this.state.usernameError === "" ? "transparent" : "red"
              }}
              value={this.state.logUserName}
              placeholder="Username"
              onChange={event => {
                // this.props.usernameChange(event);
                this.setState(
                  {
                    logUserName: event.nativeEvent.text
                  },
                  () => this.textChange()
                );
              }}
            />
          </Item>

          <Text style={{ fontSize: 15, color: "red" }}>
            {this.state.passwordError}
          </Text>
          <Item
            style={{
              backgroundColor: "transparent",
              width: "100%",
              marginBottom: "5%"
            }}
          >
            <Input
              disabled={this.state.passDisabled}
              style={{
                backgroundColor: "rgb(56, 56, 58)",
                borderWidth: 1,
                borderColor:
                  this.state.passwordError === "" ? "transparent" : "red"
              }}
              placeholder="Password"
              secureTextEntry={true}
              value={this.state.logPassword}
              onChange={event => {
                // this.props.passwordChange(event);
                this.setState(
                  {
                    logPassword: event.nativeEvent.text
                  },
                  () => this.textChange()
                );
              }}
            />
          </Item>
        </Form>
        <SubmitButtonWithAnimation
          disabled={this.state.submitDisabled}
          width={width - 40}
          height={45}
          color={this.props.color}
          onPress={() => {
            MainStore.setCurrentUser(this.state.logUserName);
            this.props.onPressSubmit();
          }}
          text="Login"
        />
      </View>
    );
  }
}
