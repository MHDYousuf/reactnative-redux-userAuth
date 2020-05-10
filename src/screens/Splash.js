import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

function Splash() {
  return (
    <View style={{ ...globalStyles.container, ...globalStyles.centering }}>
      <Text style={globalStyles.titleText}>Loading...</Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({});
