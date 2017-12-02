import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 50, fontWeight: "bold", color: "red" }}>
            SecureChat
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            rounded
            dark
            style={{ marginVertical: 30, alignSelf: "center" }}
          >
            <Text>Login</Text>
          </Button>
          <Button
            rounded
            dark
            style={{ marginVertical: 30, alignSelf: "center" }}
          >
            <Text>SignUp</Text>
          </Button>
        </View>
      </View>
    );
  }
}
