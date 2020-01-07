import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Provider } from "react-redux";
import { store } from "./redux";

ReactDOM.render(
  <Provider store={store}>
    <Hello compiler="TypeScript" framework="React" />
  </Provider>,
  document.getElementById("example")
);
