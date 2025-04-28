"use client";
import styles from "./page.module.scss";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAppSlice } from "@/hooks";
import { pageRoutes } from "@/lib/router";
import { AppModal } from "@/components";
import { useEffect } from "react";
import { VerifyEmailModal } from "@/components/Modal/ModalContents";
import Enum from "@enums";

const Page = () => {
  const containerClass = `${styles.container}`;
  const searchParams = useSearchParams();
  const { redirectTo } = useAppSlice();
  const search = searchParams.get(Enum.Route.SearchKey.TOKEN);
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
      redirectTo(pageRoutes.HOME.path);
    }
  };
  useEffect(() => {
    const timer = setTimeout(async () => {
      await verifyUser();
    }, 4000); // 3 seconds

    // Clean up the timeout if component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array = runs once on mount
  return (
    <div className={containerClass}>
      <h2>
        Thank you for registering! Please wait while your email is verified...
      </h2>
      <h3>here is your token : {search}</h3>

      <button onClick={verifyUser}>verifyUser</button>
      <AppModal open={true} title="Welcome">
        <VerifyEmailModal />
      </AppModal>
    </div>
  );
};

export default Page;
