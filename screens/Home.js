import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "../routes/GlobalState";
import { globalStyles } from "../styles/global";

function Home() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={{ ...globalStyles.container, ...globalStyles.centering }}>
      <Text style={{ ...globalStyles.titleText }}>
        Hello, you are Signed In
      </Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({});
