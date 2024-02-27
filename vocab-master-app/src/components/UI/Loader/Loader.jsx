import React, { useEffect } from "react";
import styles from "./Loader.module.scss";
import { hideLoader } from "#appSlice";

import { useSelector, useDispatch } from "react-redux";

const Loader = () => {
  const loader = useSelector((state) => state.appStore.loader);
  const dispatch = useDispatch();
  const clBackdrop = `${styles.backdrop} ${loader.show && styles.show}`;
  const clWrapper = `${styles.wrapper}`;
  const clLoader = `${styles.loader}`;
  const clText = `${styles.text}`;
  const cl1 = `${styles.inner} ${styles.one}`;
  const cl2 = `${styles.inner} ${styles.two}`;
  const cl3 = `${styles.inner} ${styles.three}`;

  // useEffect(() => {
  //   if (loader.show) {
  //     setTimeout(() => {
  //       dispatch(hideLoader());
  //     }, 2500);
  //   }
  // }, [loader.show]);
  return (
    <div className={clBackdrop}>
      <div className={clWrapper}>
        <div className={clText}>Loading</div>
        <div className={clLoader}>
          <div className={cl1}></div>
          <div className={cl2}></div>
          <div className={cl3}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
