"use client";
import styles from "./page.module.scss";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { RoutePathEnum } from "@enums";
import { useAppSlice } from "@/hooks";
const Page = () => {
  const containerClass = `${styles.container}`;
  const searchParams = useSearchParams();
  const { redirectTo } = useAppSlice();
  const search = searchParams.get("token");
  const verifyUser = async () => {
    let isValidToken = false;

    const res = await signIn(
      "credentials",
      { redirect: false },
      { token: search as string }
    );
    isValidToken = !!res && !res.error && res.ok;
    if (isValidToken) {
      // user login safe redirect to home
      redirectTo(RoutePathEnum.HOME);
    }
  };
  return (
    <div className={containerClass}>
      <h2>
        Thank you for registering! Please wait while your email is verified...
      </h2>
      <h3>here is your token : {search}</h3>

      <button onClick={verifyUser}>verifyUser</button>
    </div>
  );
};

export default Page;
