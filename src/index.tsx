import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";



ReactDOM.render(
  <Provider store={store}>
      <CssBaseline>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CssBaseline>
  </Provider>,
  document.getElementById("root")
);
