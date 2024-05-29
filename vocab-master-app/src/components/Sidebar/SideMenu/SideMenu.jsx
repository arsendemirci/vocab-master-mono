import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "components";
import styles from "./SideMenu.module.scss";
import { useIPC, useAppState } from "#hooks";
import { sideMenu } from "#routes";
const SideMenu = () => {
  console.log("[RENDERING] SideMenu Component", sideMenu);

  const navigate = useNavigate();
  const clSidebar = `${styles.sidebar}`;
  const ipc = useIPC();
  const { loggedIn } = useAppState();
  const location = useLocation();
  return (
    <nav>
      <ul className={clSidebar}>
        {sideMenu.map((menu, index) => (
          <li
            key={index + 1}
            className={`${!menu.public && !loggedIn && styles.disabled}`}
            onClick={() => {
              console.log("menu", menu, location);
              return !menu.public && !loggedIn
                ? false
                : navigate(menu.navigate());
            }}
          >
            <Icon icon={menu.icon} /> <label>{menu.label}</label>
          </li>
        ))}
        <li onClick={() => ipc.applicationExit()}>
          <Icon icon="power" />
          <label>Quit</label>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
