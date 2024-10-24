import { useDispatch } from "react-redux";
import { setCurrentPath } from "@/store/slices/appSlice";
import { Icon } from "@/components";
import styles from "./SideMenu.module.scss";
import { menu } from "@config";

const SideMenu = () => {
  const dispatch = useDispatch();

  const goTo = (path: any) => {
    dispatch(setCurrentPath(path));
  };

  return (
    <nav>
      <ul className={styles.sidebar}>
        {menu
          .filter((i) => i.inMenu)
          .map((menu) => (
            <li key={menu.name} onClick={() => goTo(menu.href)}>
              <Icon icon={menu.icon} /> <label>{menu.name}</label>
            </li>
          ))}
        <li>
          <Icon icon="power" />
          <label>Quit</label>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
