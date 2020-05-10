import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { signIn } from "../actions";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../components/Button.js";

const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(4),
});

function Login({ navigation, dispatch, notfound }) {
  return (
    <View style={{ ...globalStyles.container, ...globalStyles.centering }}>
      {notfound
        ? Alert.alert("User is not found or registered", "Please Register", [
            { text: "Ok" },
          ])
        : null}
      <Text style={{ ...globalStyles.titleText }}>Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={({ username, password }, actions) => {
          dispatch(signIn({ username, password }));
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

            <FlatButton onPress={props.handleSubmit} text="Login" />
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    textAlign: "center",
    color: "#1abc9c",
    marginVertical: 15,
    fontSize: 18,
  },
});

const mapStateToProps = (state) => ({
  notfound: state.notfound,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Login);
