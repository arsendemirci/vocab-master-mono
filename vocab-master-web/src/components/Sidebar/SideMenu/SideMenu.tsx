import { useDispatch } from "react-redux";
import { setCurrentPath } from "@/store/slices/appSlice";
import { Icon } from "@/components";
import styles from "./SideMenu.module.scss";
import { menu } from "@config";
import { useSelector } from "react-redux";
import { StoreType } from "@/types";

const SideMenu = () => {
  const dispatch = useDispatch();
  const { currentPath } = useSelector((state: StoreType) => state.appSlice);
  const menuClass = useSelector(
    (state: StoreType) => state.persistSlice.menuClass
  );
  const goTo = (path: any, index: number) => {
    dispatch(setCurrentPath(path));
  };

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
        <span className={styles.marker}></span>
      </ul>
    </nav>
  );
};

export default SideMenu;
