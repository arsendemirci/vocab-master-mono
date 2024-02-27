import React, { useEffect } from "react";
import { Sidebar, Topbar, SplashScreen, Modal, Loader } from "components";
import Router from "./router/Router.jsx";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "#appSlice";

function App() {
  const location = useLocation();
  const appState = useSelector((state) => state.appStore);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Location changed", location);
  }, [location]);
  return (
    <div>
      <SplashScreen />
      <Loader />
      <main className="main-container">
        <Sidebar />

        <section className="main-wrapper">
          <Topbar />
          <div className="page-container">
            <Router />
          </div>
        </section>
      </main>

      <Modal />
    </div>
  );
}

export default App;
