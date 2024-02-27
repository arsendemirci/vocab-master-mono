import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "components";
import styles from "./SideMenu.module.scss";
import { useIPC } from "#hooks";
import { sideMenu } from "#routes";
const SideMenu = ({ loggedIn }) => {
  const navigate = useNavigate();
  const clSidebar = `${styles.sidebar}`;
  const ipc = useIPC();
  console.log("is logged in ", loggedIn);
  return (
    <nav>
      <ul className={clSidebar}>
        {sideMenu.map((menu, index) => (
          <li
            key={index + 1}
            className={`${!menu.public && !loggedIn && styles.disabled}`}
            onClick={() => {
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
