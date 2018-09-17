import "babel-polyfill";
require("es6-promise").polyfill();
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store/store";
import App from "./App";
import "./css/reset.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
