"use client";

import { useEffect, useRef } from "react";
import { Sidebar, Topbar, PageCard } from "@/components";
import s from "./App.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "@types";
import { MainLoader } from "@/components";
import { useSession } from "next-auth/react";
import { setAuthenticated } from "@slice/persistSlice";
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refPage = useRef<any>();
  const { data } = useSession();
  const dispatch = useDispatch();
  console.log("[RENDERING] App Component", data);
  useEffect(() => {
    if (data?.user) {
      dispatch(setAuthenticated({ isAuthenticated: true, user: data.user }));
    } else if (data === null) {
      dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
    }
  }, [data]);

  const menuClass = useSelector(
    (state: StoreType) => state.persistSlice.menuClass
  );

  return (
    <>
      <MainLoader />
      <main className={`${s.mainContainer} ${s[menuClass]}`}>
        <Sidebar />

        <section className={s.mainWrapper}>
          <Topbar />
          <div className={s.pageContainer}>
            <PageCard ref={refPage}>{children}</PageCard>
          </div>
        </section>
      </main>
    </>
  );
}
