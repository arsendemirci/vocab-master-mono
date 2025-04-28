import styles from "./Spinner.module.scss";

const Spinner = ({ className }: { className?: string }) => {
  const clLoader = `${className} ${styles.loader}`;
  const cl1 = `${styles.inner} ${styles.one}`;
  const cl2 = `${styles.inner} ${styles.two}`;
  const cl3 = `${styles.inner} ${styles.three}`;

  return (
    <div className={clLoader}>
      <div className={cl1}></div>
      <div className={cl2}></div>
      <div className={cl3}></div>
    </div>
  );
};

export default Spinner;
