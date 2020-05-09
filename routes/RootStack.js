import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/Splash";
import HomeScreen from "../screens/Home";
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";
import { AuthContext } from "./GlobalState";

const Stack = createStackNavigator();

export default function RootStack() {
  const { isLoading, isSignout, userToken } = React.useContext(AuthContext);
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
