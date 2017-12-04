import React from "react";
import { View, Animated, Dimensions } from "react-native";
import { Form, Item, Input, Button, Text, Spinner } from "native-base";
let { width } = Dimensions.get("window");
import SubmitButtonWithAnimation from "../Animations3T/main/SubmitButtonWithAnimation";
import MainStore from "../MainStore/MainStore";
import * as firebase from "firebase";
import { observer } from "mobx-react/native";

@observer
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regUserName: "",
      regPassword: "",
      regRepPassword: "",
      usernameError: "",
      passwordError: "",
      passDisabled: true,
      submitDisabled: true,
      repPasswordError: ""
    };
  }
  state = {
    submitted: false
  };
  textChange() {
    this.setState(
      {
        usernameError: "",
        passwordError: "",
        repPasswordError: ""
      },
      () => this.enableSubmit()
    );
    if (this.state.regUserName) {
      Object.keys(MainStore.allUsers).map((item, index) => {
        console.log(
          MainStore.allUsers[item].username,
          "32",
          this.state.regUserName
        );
        if (MainStore.allUsers[item].username === this.state.regUserName) {
          this.setState(
            {
              usernameError: "Name already exists"
            },
            () => this.enableSubmit()
          );
        }
      });
      if (this.state.regUserName.length < 8) {
        this.setState(
          {
            usernameError: "Too short"
          },
          () => this.enableSubmit()
        );
      }
    }
    if (this.state.regPassword) {
      if (this.state.regPassword.length < 8) {
        this.setState(
          {
            passwordError: "Too short"
          },
          () => this.enableSubmit()
        );
      }
    }
    if (this.state.regRepPassword) {
      if (this.state.regRepPassword.length < 8) {
        this.setState(
          {
            repPasswordError: "Too short"
          },
          () => this.enableSubmit()
        );
      }
      if (this.state.regRepPassword !== this.state.regPassword) {
        this.setState(
          {
            repPasswordError: "Passwords dont match"
          },
          () => this.enableSubmit()
        );
      }
    }
  }
  enableSubmit() {
    this.setState({
      submitDisabled: true
    });
    if (
      this.state.usernameError === "" &&
      this.state.passwordError === "" &&
      this.state.repPasswordError === "" &&
      this.state.regUserName !== "" &&
      this.state.regPassword !== "" &&
      this.state.regRepPassword !== ""
    ) {
      console.log("enabled");
      this.setState({
        submitDisabled: false
      });
    }
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
              alignSelf: "center",
              width: "100%",
              marginBottom: "5%"
            }}
          >
            <Input
              placeholder="Username"
              style={{
                backgroundColor: "rgb(56, 56, 58)",
                alignSelf: "center",
                borderWidth: 1,
                borderColor:
                  this.state.usernameError === "" ? "transparent" : "red"
              }}
              value={this.state.regUserName}
              onChange={event => {
                // this.props.usernameChange(event);
                this.setState(
                  {
                    regUserName: event.nativeEvent.text
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
              alignSelf: "center",
              width: "100%",
              marginBottom: "5%"
            }}
          >
            <Input
              style={{
                backgroundColor: "rgb(56, 56, 58)",
                alignSelf: "center",
                borderWidth: 1,
                borderColor:
                  this.state.passwordError === "" ? "transparent" : "red"
              }}
              value={this.state.regPassword}
              placeholder="Password"
              secureTextEntry={true}
              onChange={event => {
                // this.props.passwordChange(event);
                this.setState(
                  {
                    regPassword: event.nativeEvent.text
                  },
                  () => this.textChange()
                );
              }}
            />
          </Item>
          <Text style={{ fontSize: 15, color: "red" }}>
            {this.state.repPasswordError}
          </Text>
          <Item
            style={{
              backgroundColor: "transparent",
              alignSelf: "center",
              width: "100%",
              marginBottom: "10%"
            }}
          >
            <Input
              style={{
                backgroundColor: "rgb(56, 56, 58)",
                alignSelf: "center",
                borderWidth: 1,
                borderColor:
                  this.state.repPasswordError === "" ? "transparent" : "red"
              }}
              value={this.state.regRepPassword}
              placeholder="ConfirmPassword"
              secureTextEntry={true}
              onChange={event => {
                // this.props.confirmPasswordChange(event);
                this.setState(
                  {
                    regRepPassword: event.nativeEvent.text
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
            var RSAKey = require("react-native-rsa");
            const bits = 1024;
            const exponent = "10001"; // must be a string. This is hex string. decimal = 65537
            var rsa = new RSAKey();
            rsa.generate(bits, exponent);
            var publicKey = rsa.getPublicString(); // return json encoded string
            var privateKey = rsa.getPrivateString(); // return json encoded string
            firebase
              .database()
              .ref("Users/" + this.state.regUserName)
              .set({
                username: this.state.regUserName,
                password: this.state.regPassword,
                publicKey: publicKey,
                privateKey: privateKey
              });
            MainStore.refreshAllData();
            MainStore.setCurrentUser(this.state.regUserName);
            this.props.onPressSubmit();
          }}
          text="Register"
        />
      </View>
    );
  }
}
