import React from "react";
import { Sidebar, Topbar, SplashScreen, Modal, Loader } from "components";
import Router from "./router/Router.jsx";


function App() {
  return (
    <div>
      <SplashScreen />
      <Loader />
      <main className="main-container">
        <Sidebar />

        <section className="main-wrapper">
          <Topbar />
          <div className="page-container">
            <div>
              <Router />
            </div>
          </div>
        </section>
      </main>

      <Modal />
    </div>
  );
}

export default App;
