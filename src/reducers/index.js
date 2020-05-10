const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: [{ username: "test", password: "test" }],
  notfound: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
        notfound: false,
      };
    case "SIGN_IN":
      const found =
        state.user !== null
          ? state.user.some(
              (values) =>
                values.username === action.payload.username &&
                values.password === action.payload.password
            )
          : false;
      if (found)
        return {
          ...state,
          isSignout: false,
          userToken: action.token,
          notfound: false,
        };
      else return { ...state, notfound: true };
    case "SIGN_UP":
      return {
        ...state,
        isSignout: true,
        userToken: null,
        user: [...state.user, action.payload],
        notfound: false,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
};
