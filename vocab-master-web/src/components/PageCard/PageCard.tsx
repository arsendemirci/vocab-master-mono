"use client";
import { useEffect, useState, useRef, forwardRef } from "react";
import styles from "./PageCard.module.scss";
import { PageCardProps } from "@types";
import { PageLoader, BreadCrumbs } from "@/components";
import { usePathname } from "next/navigation";
import { usePersistSlice, useAppSlice } from "@/hooks";

const PageCard: React.FC<PageCardProps> = forwardRef(
  ({ children }: PageCardProps, refPage: any) => {
    const { menuClass } = usePersistSlice();
    const { pageClass, currentPath } = useAppSlice();
    const [mainClass, setMainClass] = useState(`${styles.main}`);
    const pathName = usePathname();
    const divRef = useRef<any>();

    useEffect(() => {
      if (pageClass === "page_closed" && currentPath === pathName) {
        return;
      }

      setMainClass(`${styles.main} ${styles[pageClass]}`);

      if (pageClass === "page_open") {
        const { current } = divRef;
        if (current !== null) {
          current.scrollIntoView({ block: "end", behavior: "smooth" });
        }
      }
    }, [pageClass]);
    // console.log("PAGE CARD Renderrrrrr");
    return (
      <>
        <PageLoader show={pageClass !== "page_open"}></PageLoader>
        <BreadCrumbs />
        <section ref={refPage} className={`${mainClass} ${styles[menuClass]}`}>
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
