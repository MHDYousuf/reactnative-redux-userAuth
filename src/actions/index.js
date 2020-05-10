export const signIn = (data) => ({
  type: "SIGN_IN",
  token: "dummy-auth-token",
  payload: data,
});

export const signOut = () => ({
  type: "SIGN_OUT",
});

export const signUp = (data) => ({
  type: "SIGN_UP",
  payload: data,
});

export const restoreToken = (userToken) => ({
  type: "RESTORE_TOKEN",
  payload: userToken,
});
