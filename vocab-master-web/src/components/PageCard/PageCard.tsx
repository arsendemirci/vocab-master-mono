"use client";
import { useEffect, useState, useRef, forwardRef } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "@/types";
import styles from "./PageCard.module.scss";
import { PageCardProps } from "@types";
import { PageLoader, BreadCrumbs } from "@/components";
import { usePathname } from "next/navigation";

const PageCard: React.FC<PageCardProps> = forwardRef(
  ({ children }: PageCardProps, refPage: any) => {
    const appStore = useSelector((state: StoreType) => state.appSlice);
    const [mainClass, setMainClass] = useState(`${styles.main}`);
    const pathName = usePathname();
    const divRef = useRef<any>();

    useEffect(() => {
      if (appStore.pageClass === "close" && appStore.currentPath === pathName)
        return;
      setMainClass(`${styles.main} ${styles[appStore.pageClass]}`);

      if (appStore.pageClass === "open") {
        const { current } = divRef;
        if (current !== null) {
          current.scrollIntoView({ block: "end", behavior: "smooth" });
        }
      }
    }, [appStore.pageClass]);

    return (
      <>
        <PageLoader show={appStore.pageClass !== "open"}></PageLoader>
        <BreadCrumbs />
        <section ref={refPage} className={mainClass}>
          <div ref={divRef}></div>
          <div className={styles.wrapper}>
            <div className={styles.body}>{children}</div>
          </div>
        </section>
      </>
    );
  }
);
PageCard.displayName = "PageCard";

export default PageCard;
