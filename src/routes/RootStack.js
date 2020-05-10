import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import SplashScreen from "../screens/Splash";
import HomeScreen from "../screens/Home";
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";
import { restoreToken } from "../actions";

const Stack = createStackNavigator();

function RootStack(props) {
  const { isLoading, isSignout, userToken, dispatch } = props;

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (err) {
        console.log(err);
      }
      dispatch(restoreToken(userToken));
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : userToken == null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={LoginScreen}
            options={{
              title: "Sign in",
              animationTypeForReplace: isSignout ? "pop" : "push",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  isSignout: state.isSignout,
  userToken: state.userToken,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(RootStack);
