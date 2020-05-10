import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { signOut } from "../actions";
import { globalStyles } from "../styles/global";

function Home({ dispatch }) {
  return (
    <View style={{ ...globalStyles.container, ...globalStyles.centering }}>
      <Text style={{ ...globalStyles.titleText }}>
        Hello, you are Signed In
      </Text>
      <Button
        title="Sign out"
        onPress={() => {
          dispatch(signOut());
        }}
      />
    </View>
  );
}

export default connect()(Home);
