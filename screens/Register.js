import React from "react";
import { TextInput, View, Text } from "react-native";
import { AuthContext } from "../routes/GlobalState";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../components/Button.js";
import { NavigationHelpersContext } from "@react-navigation/native";

const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(4),
});

export default function Register({ navigation }) {
  const { signUp } = React.useContext(AuthContext);
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Register</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={({ username, password }, actions) => {
          signUp({ username, password });
          navigation.goBack();
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Enter Username"
              onChangeText={props.handleChange("username")}
              onBlur={props.handleBlur("username")}
              value={props.values.username}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>
              {props.touched.username && props.errors.username}
            </Text>

            <TextInput
              secureTextEntry={true}
              style={globalStyles.input}
              placeholder="Enter Password"
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>

            <FlatButton onPress={props.handleSubmit} text="Register" />
          </View>
        )}
      </Formik>
    </View>
  );
}
