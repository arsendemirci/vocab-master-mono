"use client";

import { useEffect, useRef } from "react";
import { Sidebar, Topbar, PageCard } from "@/components";
import s from "./App.module.scss";
import { MainLoader } from "@/components";
import { useSession } from "next-auth/react";
import { usePersistSlice } from "@hooks";
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refPage = useRef<any>();
  const { data } = useSession();
  const { signIn, signOut, menuClass } = usePersistSlice();
  console.log("[RENDERING] App Component", data);
  useEffect(() => {
    if (data?.user) {
      signIn({ user: data.user });
    } else if (data === null) {
      signOut();
    }
  }, [data]);

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
