// import { useEffect } from "react";
import styles from "./MainLoader.module.scss";
// import { hideLoader } from "@/store/slices/appSlice";
import { StoreType } from "@/types";
import { useEffect } from "react";

import { useSelector } from "react-redux";

const Loader = () => {
  const loader = useSelector((store: StoreType) => store.appSlice.loader);
  //   const dispatch = useDispatch();
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
  useEffect(() => {}, [loader.show]);
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
