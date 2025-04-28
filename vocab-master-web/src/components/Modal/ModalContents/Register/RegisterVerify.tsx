import { AppButton } from "@/components";
import styles from "@/components/Modal/ModalContents/modal.module.scss";

const RegisterVerify = ({ onClose }) => {
  return (
    <div className={styles.modalBody}>
      <img src="/assets/images/icon/exclamation.png" alt="verify"></img>
      <h1>Email is already registered!</h1>
      <p>
        This e-mail is already registered. Kindly check the email that was just
        sent to you and follow the instructions to activate your account.
      </p>
      <AppButton onClick={onClose}>Close</AppButton>
    </div>
  );
};
export default RegisterVerify;
