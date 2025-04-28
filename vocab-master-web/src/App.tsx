"use client";

import { useEffect, useRef } from "react";
import { Sidebar, Topbar, PageCard } from "@/components";
import s from "./App.module.scss";
import { MainLoader } from "@/components";
import { useSession } from "next-auth/react";
import { usePersistSlice } from "@hooks";
import Enum from "@enums";
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refPage = useRef<any>();
  const { data, update } = useSession();
  const { signIn, signOut, menuClass } = usePersistSlice();

  useEffect(() => {
    console.log("[APP - Session watcher for storage", data);

    if (data && data.user && data.user.accessToken) {
      signIn({ user: data.user });
      // updateToken();
    } else if (data === null) {
      signOut();
    }
  }, [data]);
  useEffect(() => {
    const interval = setInterval(
      () => update(),
      Enum.Token.Expires.SESSION_INTERVAL
    );
    return () => clearInterval(interval);
  }, [update]);
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
