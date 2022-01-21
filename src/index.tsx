import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootContainer from "./routes/RootContainer";
import MergeSubtitle from "./routes/MergeSubtitle";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<RootContainer />}></Route>
              <Route path="mergeSubtitle" element={<MergeSubtitle />}></Route>
            </Route>
          </Routes>
        </React.StrictMode>
      </CssBaseline>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
