import React from "react";
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
  Thumbnail
} from "native-base";

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
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="arrow-back" />
          </Left>
          <Body>
            <Title>MyChats</Title>
          </Body>
          <Right>
            <Icon name="search" />
          </Right>
        </Header>
        <Content>
          {this.state.chats.map((item, index) => {
            return (
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
                      <Text>{item.name}</Text>
                      <Text note>{item.lastMsg}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </Container>
    );
  }
}
