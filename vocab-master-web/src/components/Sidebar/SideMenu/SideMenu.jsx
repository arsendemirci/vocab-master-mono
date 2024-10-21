import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "@/providers/contextProvider";
import { usePathname } from "next/navigation";
import { Icon } from "@/components";
import styles from "./SideMenu.module.scss";
import { menu } from "@config";
import Link from "next/link";
const SideMenu = () => {
  const ref = useRef([]);
  const pushRef = (el) => ref.current.push(el);
  const clSidebar = `${styles.sidebar}`;
  const ctx = useContext(AppContext);
  const pathName = usePathname();
  const goTo = (path) => {
    ctx.setPath(path);
  };
  useEffect(() => {
    if (pathName !== ctx.currentPath) {
      ctx.setPageClassName("close");
      setTimeout(() => {
        let refIndex =
          ctx.currentPath == "/home"
            ? 0
            : ctx.currentPath == "/game"
            ? 1
            : ctx.currentPath == "/words"
            ? 2
            : 3;
        // router.push(ctx.currentPath);
        console.log(ref.current);
        ref.current[refIndex].click();
      }, 450);
    } else {
      ctx.setPageClassName("open");
    }
  }, [ctx.currentPath, pathName]);
  return (
    <nav>
      <ul className={clSidebar}>
        {menu.map((menu, index) => (
          <li key={menu.name} onClick={() => goTo(menu.href)}>
            <a>
              <Icon icon={menu.icon} /> <label>{menu.name}</label>
            </a>
            <Link
              ref={pushRef}
              href={menu.href}
              className={styles.routeLink}
            ></Link>
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
