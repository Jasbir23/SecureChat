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
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>SignUp</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel style={{ marginVertical: 20, marginTop: 20 }}>
              <Label>Choose Username</Label>
              <Input
                onTextChange={text => {
                  this.setState({
                    username: text
                  });
                }}
              />
            </Item>
            <Item floatingLabel style={{ marginVertical: 20 }} last>
              <Label>Choose Password</Label>
              <Input
                onTextChange={text => {
                  this.setState({
                    password: text
                  });
                }}
              />
            </Item>
            <Item floatingLabel style={{ marginVertical: 20 }} last>
              <Label>Repeat Password</Label>
              <Input
                onTextChange={text => {
                  this.setState({
                    repassword: text
                  });
                }}
              />
            </Item>
          </Form>
          <Button
            rounded
            primary
            style={{ alignSelf: "center", marginVertical: 20 }}
            onPress={() => this.props.navigation.navigate("MyChats")}
          >
            <Text>SignUp</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
