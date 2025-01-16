import { useDispatch } from "react-redux";
import { Icon } from "@/components";
import styles from "./SideMenu.module.scss";
import { routes } from "@config";
import { usePersistSlice, useAppSlice } from "@hooks";
import { RouteTypeEnum } from "@/config/enums";

const SideMenu = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, menuClass } = usePersistSlice();
  const { redirectTo, currentPath } = useAppSlice();
  const goTo = (path: any, index: number) => {
    redirectTo(path);
  };

  return (
    <nav>
      <ul className={`${styles.sidebar} ${styles[menuClass]}`}>
        {routes
          .filter((i) => i.menu && i.type === RouteTypeEnum.PAGE)
          .map((menu, index) => {
            const itemClass = `${styles.menuItem} ${
              !isAuthenticated && !menu.public && styles.disabled
            } ${currentPath.includes(menu.path) && styles.active}`;
            return (
              <li
                className={itemClass}
                key={menu.name}
                onClick={() => goTo(menu.path, index)}
              >
                <Icon icon={menu.icon as string} /> <label>{menu.name}</label>
              </li>
            );
          })}
        <span className={styles.marker}></span>
      </ul>
    </nav>
  );
};

export default SideMenu;
