import * as React from "react";
import { AsyncStorage } from "react-native";
import AppReducer from "./reducer";

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: [{ username: "test", password: "test" }],
  notfound: false,
};

export const AuthContext = React.createContext(initialState);

export const GlobalProvider = ({ navigation, children }) => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (err) {
        console.log(err);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({
          type: "SIGN_IN",
          token: "dummy-auth-token",
          payload: data,
        });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_UP", payload: data });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        signIn: authContext.signIn,
        signOut: authContext.signOut,
        signUp: authContext.signUp,
        isLoading: state.isLoading,
        isSignout: state.isSignout,
        userToken: state.userToken,
        notfound: state.notfound,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
