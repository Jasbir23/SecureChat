import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  Item,
  Input,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Button,
  Icon
} from "native-base";
import MainStore from "../MainStore/MainStore";
import * as firebase from "firebase";
import { observer } from "mobx-react/native";

@observer
export default class FindChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedUsers: []
    };
  }
  componentWillMount() {
    MainStore.refreshAllData();
  }
  render() {
    if (MainStore.allUsers[MainStore.currentUser]) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Item
              style={{
                backgroundColor: "transparent",
                width: "100%"
              }}
            >
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </TouchableOpacity>
              <Input
                style={{
                  backgroundColor: "rgb(56, 56, 58)"
                }}
                placeholder="Search User"
                onChange={event => {
                  let txt = event.nativeEvent.text;
                  this.setState(
                    {
                      suggestedUsers: []
                    },
                    () => {
                      Object.keys(MainStore.allUsers).map((item, index) => {
                        console.log(MainStore.allUsers[item].username);
                        if (
                          txt ===
                          MainStore.allUsers[item].username.substring(
                            0,
                            txt.length
                          )
                        ) {
                          let found = MainStore.allUsers[item].username;
                          let temp = this.state.suggestedUsers;
                          const exists = false;
                          if (temp === []) {
                            temp.push(MainStore.allUsers[item]);
                            this.setState({
                              suggestedUsers: temp
                            });
                          } else if (temp !== []) {
                            temp.map((item, index) => {
                              if (item.username === found) {
                                console.log("exists");
                                exists = true;
                              }
                            });
                            if (!exists) {
                              temp.push(MainStore.allUsers[item]);
                              this.setState({
                                suggestedUsers: temp
                              });
                            }
                          }
                        }
                      });
                      if (txt === "") {
                        this.setState({
                          suggestedUsers: []
                        });
                      }
                    }
                  );
                }}
              />
            </Item>
          </View>
          <View style={{ flex: 6 }}>
            <FlatList
              keyExtractor={(item, index) => index}
              data={this.state.suggestedUsers}
              contentContainerStyle={{ paddingTop: 20 }}
              renderItem={({ item }) => {
                let obj = {
                  nextKey: {
                    val: 0
                  }
                };
                return (
                  <TouchableOpacity
                    onPress={() => {
                      MainStore.setChatUser(item.username);
                      let exists = false;
                      if (MainStore.allUsers[MainStore.currentUser].chats) {
                        Object.keys(
                          MainStore.allUsers[MainStore.currentUser].chats
                        ).map((item, index) => {
                          if (
                            item.substring(
                              MainStore.currentUser.length,
                              item.length
                            ) === MainStore.chatUser
                          ) {
                            exists = true;
                          }
                        });
                      }
                      if (!exists) {
                        firebase
                          .database()
                          .ref(
                            "Users/" +
                              MainStore.allUsers[MainStore.currentUser]
                                .username +
                              "/chats/" +
                              MainStore.allUsers[MainStore.currentUser]
                                .username +
                              item.username
                          )
                          .set({
                            chatName:
                              MainStore.allUsers[MainStore.currentUser]
                                .username + item.username,
                            messages: obj
                          });
                        firebase
                          .database()
                          .ref(
                            "Users/" +
                              item.username +
                              "/chats/" +
                              item.username +
                              MainStore.allUsers[MainStore.currentUser].username
                          )
                          .set({
                            chatName:
                              item.username +
                              MainStore.allUsers[MainStore.currentUser]
                                .username,
                            messages: obj
                          });
                      }
                      this.props.navigation.navigate("ChatScreen");
                    }}
                  >
                    <Card>
                      <CardItem>
                        <Left>
                          <Thumbnail
                            source={{
                              uri:
                                "https://n6-img-fp.akamaized.net/free-icon/profile-user_318-80283.jpg?size=338c&ext=jpg"
                            }}
                          />
                          <Body>
                            <Text>{item.username}</Text>
                          </Body>
                        </Left>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
