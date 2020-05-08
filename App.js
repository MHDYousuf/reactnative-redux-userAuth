import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigate from "./routes/RootStack";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigate />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
