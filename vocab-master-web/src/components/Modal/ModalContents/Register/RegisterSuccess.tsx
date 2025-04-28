import { AppButton } from "@/components";
import styles from "@/components/Modal/ModalContents/modal.module.scss";

const RegisterSuccess = ({ onClose }) => {
  return (
    <div className={styles.modalBody}>
      <img src="/assets/images/icon/check.png" alt="success"></img>
      <h1>Registration Submitted!</h1>
      <p>
        Your registration form has been submitted successfully, to complete
        registration process please follow the instructions in the e-mail that
        has just been sent to you.
      </p>
      <AppButton onClick={onClose}>Close</AppButton>
    </div>
  );
};
export default RegisterSuccess;
