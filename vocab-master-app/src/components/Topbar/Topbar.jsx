import "./Topbar.scss";
import React from "react";
import logo from "../../assets/images/logo/brand_menu.png";

function Topbar() {
  return (
    <div className="top-bar">
      <div className="top-bar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="top-bar-content">
        Lorem Ipsum for now {new Date().toLocaleString()}
      </div>
    </div>
  );
}
export default Topbar;
