import style from "./BreadCrumbs.module.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components";
import { Route } from "@/types";
import { routes } from "@config";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { RoutePathEnum, RouteTypeEnum, IconEnum } from "@/config/enums";
import { usePersistSlice, useAppSlice } from "@/hooks";

const BreadCrumbs = () => {
  const { menuClass } = usePersistSlice();
  const { redirectTo, openPage, closePage, currentPath } = useAppSlice();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [crumb, setCrumb] = useState<Route[]>([]);

  const setCurrentPage = useCallback(() => {
    const search = searchParams.get("from");

    if (!currentPath) {
      //here means no app navigation history (user comes by the url)
      closePage();
      setTimeout(() => redirectTo(pathName as RoutePathEnum), 450);
    } else {
      //
      if (pathName !== currentPath) {
        closePage();
        setTimeout(() => {
          if (search === "redirect" && currentPath !== RoutePathEnum.HOME) {
            redirectTo(pathName as RoutePathEnum);
          } else {
            router.push(currentPath);
          }
        }, 450);
      } else {
        if (search === "redirect") {
          router.push(`${currentPath}?${searchParams.toString()}`);
        }
        openPage();
      }
    }
  }, [currentPath, pathName]);

  useEffect(() => {
    const crumbList: Route[] = [];

    const parent = routes.find((i) => {
      return i.type == RouteTypeEnum.PAGE && currentPath.includes(i.path);
    });
    if (parent && parent.path !== RoutePathEnum.HOME) {
      crumbList.push(parent);
      if (
        currentPath !== parent.path &&
        parent.children &&
        parent.children.length
      ) {
        const subRoute = parent.children.find((i) =>
          i.path.includes(currentPath)
        );
        if (subRoute) {
          crumbList.push(subRoute);
        }
      }
    }
    setCrumb(crumbList);
  }, [currentPath]);
  useEffect(() => {
    setCurrentPage();
  }, [setCurrentPage]);

  return (
    <div
      className={`${style.wrapper} ${style[menuClass]} ${
        !crumb.length && style["noCrumb"]
      }`}
    >
      {!!crumb.length && (
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <div onClick={() => redirectTo(RoutePathEnum.HOME)}>
            <Icon icon={IconEnum.HOME} />
            <a>Home</a>
          </div>
          {crumb.map((route) => (
            <div
              key={route.path}
              onClick={() => redirectTo(route.path as RoutePathEnum)}
            >
              <Icon icon={route.icon as string} />
              <a>{route.name}</a>
            </div>
          ))}
        </Breadcrumbs>
      )}
    </div>
  );
};
export default BreadCrumbs;
