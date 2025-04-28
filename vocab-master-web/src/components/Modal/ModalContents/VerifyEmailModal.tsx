import { Spinner } from "@/components";
import styles from "@/components/Modal/ModalContents/modal.module.scss";

const VerifyEmailModal = () => {
  return (
    <div className={styles.modalBody}>
      <Spinner />
      <h1>Email is verified!</h1>
      <p>
        Thank you for your registration, your email has been verified and your
        VM account has been activated. Please wait while we sign you in and
        redirect you to the home page.
      </p>
    </div>
  );
};
export default VerifyEmailModal;
