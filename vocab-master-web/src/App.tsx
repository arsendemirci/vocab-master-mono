"use client";

import { useRef } from "react";
import { Sidebar, Topbar, PageCard } from "@/components";
import s from "./App.module.scss";

import { useSelector } from "react-redux";
import { StoreType } from "@types";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refPage = useRef<any>();
  const menuClass = useSelector((state: StoreType) => state.appSlice.menuClass);
  return (
    <main className={`${s.mainContainer} ${s[menuClass]}`}>
      <Sidebar />

      <section className={s.mainWrapper}>
        <Topbar />
        <div className={s.pageContainer}>
          <PageCard ref={refPage}>{children}</PageCard>
        </div>
      </section>
    </main>
  );
}
