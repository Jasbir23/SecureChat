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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { encrypted: false, self: false, value: "Hi how are you?" },
        {
          encrypted: false,
          self: true,
          value:
            "All Good lkhasdkjhfksdan nfsadkfasd hifhsda fadskjbfjks fhihfdskjb kjhjkasfbs"
        },
        { encrypted: true, self: false, value: "Secret SuperSecret Message" }
      ],
      active: false,
      encrypted: true
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity>
              <Icon name="arrow-back" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>Manoj</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          data={this.state.messages}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  justifyContent: item.self ? "flex-start" : "flex-end",
                  backgroundColor: item.self
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
                      <Text>{item.value}</Text>
                    </CardItem>
                  </Card>
                </View>
              </View>
            );
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
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <Icon
                  style={{ color: this.state.encrypted ? "white" : "black" }}
                  name="attach"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
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
