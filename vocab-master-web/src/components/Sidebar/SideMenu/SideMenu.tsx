import { useDispatch } from "react-redux";
import { setCurrentPath } from "@/store/slices/appSlice";
import { Icon } from "@/components";
import styles from "./SideMenu.module.scss";
import { menu } from "@config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "@/types";

const SideMenu = () => {
  const dispatch = useDispatch();
  // const [activePath, setActive] = useState<number>(0);
  const { menuClass, currentPath } = useSelector(
    (state: StoreType) => state.appSlice
  );
  const goTo = (path: any, index: number) => {
    // setActive(index);
    dispatch(setCurrentPath(path));
  };
  // useEffect(() => {
  //   if (currentPath) {
  //   }
  // }, [currentPath]);
  return (
    <nav>
      <ul className={`${styles.sidebar} ${styles[menuClass]}`}>
        {menu
          .filter((i) => i.inMenu)
          .map((menu, index) => (
            <li
              className={`${styles.menuItem} ${
                currentPath.includes(menu.href) && styles.active
              }`}
              key={menu.name}
              onClick={() => goTo(menu.href, index)}
            >
              <Icon icon={menu.icon} /> <label>{menu.name}</label>
            </li>
          ))}
        <li className={styles.menuItem}>
          <Icon icon="power" />
          <label>Quit</label>
        </li>
        <span className={styles.marker}></span>
      </ul>
    </nav>
  );
};

export default SideMenu;
