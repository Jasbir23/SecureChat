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
  Form,
  Item,
  Label,
  Input,
  Text
} from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel style={{ marginVertical: 20, marginTop: 20 }}>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ marginVertical: 20 }} last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Button
            rounded
            primary
            style={{ alignSelf: "center", marginVertical: 20 }}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
