import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Navigator from "./src/routes/RootStack";
import rootReducer from "./src/reducers";

function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
