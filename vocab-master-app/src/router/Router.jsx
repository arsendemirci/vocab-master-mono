import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes.js";

const Router = () => {
  return (
    <Routes>
      {Object.entries(routes).map(([name, route]) => (
        <Route
          key={name}
          path={route.path}
          element={route.element}
          title={route.title}
        />
      ))}
    </Routes>
  );
};

export default Router;
