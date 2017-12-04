import React from "react";
import {
  TouchableOpacity,
  FlatList,
  Dimensions,
  View,
  Image
} from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Card,
  CardItem,
  Icon,
  Thumbnail,
  Item,
  Input,
  Fab
} from "native-base";
const { width, height } = Dimensions.get("window");
import * as firebase from "firebase";
import MainStore from "../MainStore/MainStore";
import { observer } from "mobx-react/native";
var RSAKey = require("react-native-rsa");
var rsa = new RSAKey();

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {
        nextKey: {
          val: 0
        }
      },
      active: false,
      encrypted: true,
      typedMessage: ""
    };
  }
  componentDidMount() {
    // firebase
    //   .database()
    //   .ref(
    //     "Users/" +
    //       MainStore.currentUser +
    //       "/chats/" +
    //       MainStore.currentUser +
    //       MainStore.chatUser +
    //       "/messages/data/msgId" +
    //       this.state.messages.nextKey
    //   )
    //   .set({
    //     value: "Hello",
    //     type: "text"
    //   });
    console.log(
      "Users/" +
        MainStore.currentUser +
        "/chats/" +
        MainStore.currentUser +
        MainStore.chatUser +
        "/messages"
    );
    firebase
      .database()
      .ref(
        "Users/" +
          MainStore.currentUser +
          "/chats/" +
          MainStore.currentUser +
          MainStore.chatUser +
          "/messages"
      )
      .on("value", snapshot => {
        if (snapshot !== undefined) {
          console.log(snapshot.val());
          let val = snapshot.val();
          this.setState({
            messages: val ? val : undefined
          });
        }
      });
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>{MainStore.chatUser}</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          data={
            this.state.messages.nextKey.val === 0
              ? []
              : Object.keys(this.state.messages.data)
          }
          contentContainerStyle={{ paddingTop: 20 }}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            console.log(item);
            if (this.state.messages.data[item].encrypted === false) {
              console.log("non encrypted");
              return (
                <View
                  key={Math.random()}
                  style={{
                    justifyContent:
                      this.state.messages.data[item].sender ===
                      MainStore.currentUser
                        ? "flex-start"
                        : "flex-end",
                    backgroundColor:
                      this.state.messages.data[item].sender ===
                      MainStore.currentUser
                        ? "rgb(218, 226, 239)"
                        : "rgb(225, 239, 218)",
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 10,
                      marginVertical: 10,
                      width: "60%"
                    }}
                  >
                    <Card>
                      <CardItem>
                        <Text>{this.state.messages.data[item].value}</Text>
                      </CardItem>
                    </Card>
                  </View>
                </View>
              );
            } else if (this.state.messages.data[item].encrypted === true) {
              console.log("encrypted");
              rsa.setPrivateString(
                MainStore.allUsers[this.state.messages.data[item].Receiver]
                  .privateKey
              );
              var decrypted = rsa.decrypt(this.state.messages.data[item].value);
              return (
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "black",
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 10,
                      marginVertical: 10,
                      width: "60%"
                    }}
                  >
                    <Card>
                      <CardItem>
                        <Text>{this.state.messages.data[item].value}</Text>
                      </CardItem>
                      <CardItem>
                        <Text>{decrypted}</Text>
                      </CardItem>
                    </Card>
                  </View>
                </View>
              );
            }
          }}
        />
        <View
          style={{
            position: "absolute",
            width: width,
            height: 60,
            top: this.state.focussed ? height - 400 : height - 60,
            padding: 5,
            backgroundColor: this.state.encrypted ? "black" : "white"
          }}
        >
          <Item>
            <Input
              style={{
                color: this.state.encrypted ? "white" : "black",
                padding: 2
              }}
              onChange={event => {
                console.log(event.nativeEvent.text);
                this.setState({
                  typedMessage: event.nativeEvent.text
                });
              }}
              onFocus={() => {
                this.setState({
                  focussed: true
                });
              }}
              onBlur={() => {
                this.setState({
                  focussed: false
                });
              }}
              placeholder={
                this.state.encrypted ? "encrypted message" : "Type a message"
              }
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                disabled={this.state.typedMessage === "" ? true : false}
                style={{ marginHorizontal: 10 }}
              >
                <Icon
                  style={{ color: this.state.encrypted ? "white" : "black" }}
                  name="attach"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  console.log(
                    "Users/" +
                      MainStore.currentUser +
                      "/chats/" +
                      MainStore.currentUser +
                      MainStore.chatUser +
                      "/messages/data/" +
                      this.state.messages.nextKey.val
                  );
                  rsa.setPublicString(
                    MainStore.allUsers[MainStore.chatUser].publicKey
                  );
                  var originText = this.state.typedMessage;
                  var encrypted = rsa.encrypt(originText);
                  firebase
                    .database()
                    .ref(
                      "Users/" +
                        MainStore.currentUser +
                        "/chats/" +
                        MainStore.currentUser +
                        MainStore.chatUser +
                        "/messages/data/msgId" +
                        this.state.messages.nextKey.val
                    )
                    .set({
                      value: encrypted,
                      type: "text",
                      sender: MainStore.currentUser,
                      Receiver: MainStore.chatUser,
                      encrypted: true
                    });
                  firebase
                    .database()
                    .ref(
                      "Users/" +
                        MainStore.currentUser +
                        "/chats/" +
                        MainStore.currentUser +
                        MainStore.chatUser +
                        "/messages/nextKey"
                    )
                    .set({
                      val: this.state.messages.nextKey.val + 1
                    });
                  firebase
                    .database()
                    .ref(
                      "Users/" +
                        MainStore.chatUser +
                        "/chats/" +
                        MainStore.chatUser +
                        MainStore.currentUser +
                        "/messages/data/msgId" +
                        this.state.messages.nextKey.val
                    )
                    .set({
                      value: encrypted,
                      type: "text",
                      sender: MainStore.currentUser,
                      Receiver: MainStore.chatUser,
                      encrypted: true
                    });
                  firebase
                    .database()
                    .ref(
                      "Users/" +
                        MainStore.chatUser +
                        "/chats/" +
                        MainStore.chatUser +
                        MainStore.currentUser +
                        "/messages/nextKey"
                    )
                    .set({
                      val: this.state.messages.nextKey.val + 1
                    });
                }}
              >
                <Text
                  style={{ color: this.state.encrypted ? "white" : "black" }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </Item>
        </View>
        <Fab
          active={this.state.active}
          direction="down"
          containerStyle={{}}
          style={{ backgroundColor: "black" }}
          position="topRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>E</Text>
          <Button style={{ backgroundColor: "red" }}>
            <Text style={{ alignSelf: "center", fontSize: 15 }}>RSA</Text>
          </Button>
          <Button style={{ backgroundColor: "blue" }}>
            <Text style={{ alignSelf: "center", fontSize: 15 }}>AES</Text>
          </Button>
        </Fab>
      </Container>
    );
  }
}
