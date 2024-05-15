import "./Sidebar.scss";
import React from "react";

import { ProfileCard, SideMenu } from "./index.js";

function Sidebar() {
  console.log("[RENDERING] Sidebar Component");

  return (
    <div>
      <div className="sidebar-left-top"></div>
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="scrollbox-wrapper">
            <SideMenu />
          </div>
        </div>
        <ProfileCard />
      </div>
    </div>
  );
}
export default Sidebar;
