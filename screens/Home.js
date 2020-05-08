import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Home = ({ navigation }, props) => {
  const handleSignout = () => {
    navigation.goBack();
  };

  console.log(props);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button onPress={handleSignout} title="Log out" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
