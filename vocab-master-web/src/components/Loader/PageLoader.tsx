import { LoaderPropsType } from "@types";
import styles from "./PageLoader.module.scss";

const PageLoader = ({ show }: LoaderPropsType) => {
  return (
    <div className={`${styles.backdrop} ${show ? styles.show : ""}`}>
      <div className={styles.loader}>
        <div className={`${styles.inner} ${styles.one}`}></div>
        <div className={`${styles.inner} ${styles.two}`}></div>
        <div className={`${styles.inner} ${styles.three}`}></div>
      </div>
    </div>
  );
};

export default PageLoader;
