import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  View,
  Image,
  Text,
} from "react-native";
import AnimatedBoxesScrollView from "./AnimatedBoxesScrollView";
import FakeBottomBar from "./FakeBottomBar";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const { width } = Dimensions.get("screen");

const boxes1 = [
  {
    image: require("./assets/1.png"),
    id: 1,
  },
  {
    image: require("./assets/2.png"),
    id: 2,
  },
  {
    image: require("./assets/1.png"),
    id: 3,
  },
  {
    image: require("./assets/2.png"),
    id: 4,
  },
  {
    image: require("./assets/1.png"),
    id: 5,
  },
  {
    image: require("./assets/2.png"),
    id: 6,
  },
  {
    image: require("./assets/1.png"),
    id: 7,
  },
  {
    image: require("./assets/2.png"),
    id: 8,
  },
];
const boxes2 = [
  {
    image: require("./assets/3.png"),
    id: 3,
  },
  {
    image: require("./assets/4.png"),
    id: 4,
  },
  {
    image: require("./assets/5.png"),
    id: 5,
  },
  {
    image: require("./assets/3.png"),
    id: 6,
  },
  {
    image: require("./assets/4.png"),
    id: 7,
  },
  {
    image: require("./assets/5.png"),
    id: 8,
  },
];
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" animated={true} />
      <View style={styles.header}>
        <Text style={styles.text}>4twiggers</Text>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
          }}
        />
      </View>
      <AnimatedBoxesScrollView horizontal={true} boxes={boxes1} />
      <AnimatedBoxesScrollView horizontal={false} boxes={boxes2} />
      <View style={styles.tabBar}>
        <FakeBottomBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171A23",
    paddingTop: getStatusBarHeight(),
  },
  header: {
    height: 50,
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 38,
  },
  image: {
    height: 38,
    width: 38,
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: "900",
    color: "white",
  },
  tabBar: {
    height: 121,
    width,
    flexDirection: "row",
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
  },
});
