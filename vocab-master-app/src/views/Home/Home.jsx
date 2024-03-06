import React from "react";
import { useIPC } from "#hooks";
import { useDispatch } from "react-redux";
import { showLoader } from "#appSlice";
import styles from "./Home.module.scss";
import Landing from "./Landing/Landing.jsx";

function Home() {
  const ipc = useIPC((state) => state.userStore);
  const dispatch = useDispatch();
  const clWrap = `${styles.wrapper}`;
  const clFeatures = `${styles.features}`;
  const clCard = `${styles.card}`;
  const clHead = `${styles.headline}`;
  return <Landing />;
}

export default Home;
