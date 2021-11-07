import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import AnimatedBoxesScrollView from "./AnimatedBoxesScrollView";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedBoxesScrollView horizontal={true} />
      <AnimatedBoxesScrollView horizontal={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#031838",
    paddingHorizontal: 16,
  },
});
