"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
const Page = () => {
  useEffect(() => {
    signOut({ redirect: false });
  }, []);
  return null;
};

export default Page;
