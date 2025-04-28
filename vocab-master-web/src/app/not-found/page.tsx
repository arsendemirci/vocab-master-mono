"use client";
import { Button } from "@mui/material";
import s from "./page.module.scss";
import { useAppSlice } from "@/hooks";
import { pageRoutes } from "@/lib/router";

export default function NotFound() {
  const { redirectTo } = useAppSlice();
  return (
    <div className={s.wrapper}>
      <img src="/assets/images/not_found.png" width={500} alt="" />
      <h2>Sorry, the page you are looking for does not exist.</h2>
      <p>
        <Button
          variant="contained"
          onClick={() => redirectTo(pageRoutes.HOME.path)}
        >
          Return to Homepage
        </Button>
      </p>
    </div>
  );
}
