import style from "./BreadCrumbs.module.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openPage, closePage } from "@/store/slices/appSlice";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components";
import { NavLinkType, StoreType } from "@/types";
import { menu } from "@config";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { formatString } from "@/utils/stringUtils";
import { setCurrentPath } from "@/store/slices/appSlice";

const BreadCrumbs = () => {
  const appStore = useSelector((state: StoreType) => state.appSlice);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();
  const [crumb, setCrumb] = useState<NavLinkType[]>([]);
  const [path, setPath] = useState<String>("");

  useEffect(() => {
    const crumbList: NavLinkType[] = [];
    const parent = menu.find((i) => appStore.currentPath.includes(i.href));
    if (parent && parent.href !== "/home") {
      crumbList.push(parent);
      if (
        appStore.currentPath !== parent.href &&
        parent.subRoutes &&
        parent.subRoutes.length
      ) {
        const subRoute = parent.subRoutes.find((i) =>
          formatString(i.href, params.id)
        );
        if (subRoute) {
          crumbList.push(subRoute);
        }
      }
    }
    setCrumb(crumbList);
  }, [appStore.currentPath]);
  useEffect(() => {
    if (!path) {
      //here means no app navigation history (user comes by the url)
      setPath("loaded");
      dispatch(setCurrentPath(pathName));
    } else {
      // console.log(
      //   "currentPath",
      //   appStore.currentPath,
      //   pathName,
      //   window.history
      // );

      if (pathName !== appStore.currentPath) {
        dispatch(closePage());
        setTimeout(() => router.push(appStore.currentPath), 450);
      } else {
        dispatch(openPage());
      }
    }
  }, [appStore.currentPath, pathName]);

  return (
    <div className={style.wrapper}>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <div onClick={() => dispatch(setCurrentPath("/home"))}>
          <Icon icon="home" />
          <a>Home</a>
        </div>
        {crumb.map((route) => (
          <div
            key={route.href}
            onClick={() => dispatch(setCurrentPath(route.href))}
          >
            <Icon icon={route.icon} />
            <a>{route.name}</a>
          </div>
        ))}
      </Breadcrumbs>
    </div>
  );
};
export default BreadCrumbs;
