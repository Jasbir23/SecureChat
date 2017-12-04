import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Text,
  Card,
  CardItem,
  Icon,
  Thumbnail
} from "native-base";
import { observer } from "mobx-react/native";
import MainStore from "../MainStore/MainStore";

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [
        { name: "Prashu", lastMsg: "Hi" },
        { name: "Manoj", lastMsg: "Hey there" },
        { name: "Jasbir", lastMsg: "hollo" }
      ]
    };
  }
  renderChats() {
    console.log(MainStore.allUsers, MainStore.currentUser);
    if (MainStore.allUsers[MainStore.currentUser].chats) {
      return Object.keys(
        MainStore.allUsers[MainStore.currentUser].chats
      ).map((item, index) => {
        console.log(MainStore.allUsers[MainStore.currentUser].chats[item]);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log(MainStore.allUsers[MainStore.currentUser]);
              // MainStore.setChatUser("Prashu12");
              MainStore.setChatUser(
                MainStore.allUsers[MainStore.currentUser].chats[
                  item
                ].chatName.substring(
                  MainStore.currentUser.length,
                  MainStore.allUsers[MainStore.currentUser].chats[item].chatName
                    .length
                )
              );
              this.props.navigation.navigate("ChatScreen");
            }}
          >
            <Card key={index}>
              <CardItem>
                <Left>
                  <Thumbnail
                    source={{
                      uri:
                        "https://n6-img-fp.akamaized.net/free-icon/profile-user_318-80283.jpg?size=338c&ext=jpg"
                    }}
                  />
                  <Body>
                    <Text>
                      {MainStore.allUsers[MainStore.currentUser].chats[
                        item
                      ].chatName.substring(
                        MainStore.currentUser.length,
                        MainStore.allUsers[MainStore.currentUser].chats[item]
                          .chatName.length
                      )}
                    </Text>
                    <Text note>hello</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      });
    } else if (MainStore.allUsers[MainStore.currentUser].chats === undefined) {
      return (
        <Card>
          <CardItem>
            <Body>
              <Text>No chats yet</Text>
            </Body>
          </CardItem>
        </Card>
      );
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>MyChats</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("FindChat")}
            >
              <Icon name="search" />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
          {MainStore.allUsers[MainStore.currentUser]
            ? this.renderChats()
            : null}
        </Content>
      </Container>
    );
  }
}
