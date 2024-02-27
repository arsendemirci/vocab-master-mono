import "./Sidebar.scss";
import React from "react";

import { ProfileCard, SideMenu } from "./index.js";
import { useSelector } from "react-redux";

function Sidebar() {
  const user = useSelector((state) => state.userStore.user);

  return (
    <div>
      <div className="sidebar-left-top"></div>
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="scrollbox-wrapper">
            <SideMenu loggedIn={user.id && user.id > 0} />
          </div>
        </div>
        <ProfileCard />
      </div>
    </div>
  );
}
export default Sidebar;
