import "./style/index.scss";
import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
       
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
