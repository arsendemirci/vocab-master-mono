import style from "./BreadCrumbs.module.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { usePersistSlice, useAppSlice } from "@/hooks";
import { pageRoutes, pageRoutesArray } from "@/lib/router";
import Enum from "@enums";
const BreadCrumbs = () => {
  const { menuClass } = usePersistSlice();
  const { redirectTo, openPage, closePage, currentPath, path } = useAppSlice();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [crumb, setCrumb] = useState<any[]>([]);

  const setCurrentPage = useCallback(() => {
    const search = searchParams.get("from");
    if (pathName === pageRoutes.SIGNOUT.path) {
      if (currentPath !== pageRoutes.ACCOUNT.path) {
        closePage();
        setTimeout(() => redirectTo(pageRoutes.ACCOUNT.path), 450);
      }
    }
    if (!currentPath) {
      //here means no app navigation history (user comes by the url)
      // closePage();
      // setTimeout(() => redirectTo(pathName), 450);
    } else {
      //
      if (pathName !== path) {
        closePage();
        setTimeout(() => {
          if (
            search === Enum.QueryParam.NO_ACCEES &&
            currentPath !== pageRoutes.HOME.path
          ) {
            redirectTo(pathName);
          } else {
            router.push(currentPath);
          }
        }, 450);
      } else {
        if (search === Enum.QueryParam.NO_ACCEES) {
          router.push(`${currentPath}?${searchParams.toString()}`);
        }
        openPage();
      }
    }
  }, [currentPath, pathName]);

  useEffect(() => {
    const crumbList: any[] = [];

    const parent = pageRoutesArray.find((i) => {
      return i.type == Enum.Route.Type.PAGE && currentPath.includes(i.path);
    });
    if (parent && parent.path !== pageRoutes.HOME.path) {
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
          <div onClick={() => redirectTo(pageRoutes.HOME.path)}>
            <Icon icon={Enum.Icon.HOME} />
            <a>Home</a>
          </div>
          {crumb.map((route) => (
            <div key={route.path} onClick={() => redirectTo(route.path)}>
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
