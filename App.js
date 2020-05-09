import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/RootStack";
import { GlobalProvider } from "./routes/GlobalState";

export default function App({ navigation }) {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Navigator />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
