import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../components/Button.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(8),
});

export default function Login({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { username: "test", password: "test1234" },
  ]);

  const handleSignup = () => {
    setModalOpen(true);
  };

  const addUser = (values) => {
    setUsers((currentusers) => {
      return [...currentusers, values];
    });
    setModalOpen(false);
  };
  const handleLogin = ({ username, password }) => {
    const found = users.some(
      (values) => values.username === username && values.password === password
    );
    if (found) navigation.replace("Home", username);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...globalStyles.container, ...globalStyles.centering }}>
        <Modal visible={modalOpen} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <MaterialIcons
                name="close"
                size={24}
                style={{ ...styles.modalToggle, ...styles.modalClose }}
                onPress={() => setModalOpen(false)}
              />

              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                  actions.resetForm();
                  addUser(values);
                }}
              >
                {(props) => (
                  <View>
                    <TextInput
                      autoFocus
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
                      style={globalStyles.input}
                      password={true}
                      secureTextEntry={true}
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
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            // addReview(values);
            handleLogin(values);
          }}
        >
          {(props) => (
            <View>
              <TextInput
                autoFocus
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
                style={globalStyles.input}
                password={true}
                secureTextEntry={true}
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
        <TouchableOpacity onPress={handleSignup}>
          <View style={styles.signup}>
            <Text style={styles.signupText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  signup: {
    marginTop: 20,
    padding: 20,
  },
  signupText: {
    color: "#2980b9",
    textAlign: "center",
    fontSize: 15,
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
