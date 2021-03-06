import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import AppRoutes from "./AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  useEffect(() => {
    const token = store.getState().auth.token;
    if (token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <BrowserRouter>
      <>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <AppRoutes />
          </div>
        </Provider>
      </>
    </BrowserRouter>
  );
};

export default App;
