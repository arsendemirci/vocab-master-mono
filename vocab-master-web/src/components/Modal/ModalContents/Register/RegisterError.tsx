import { AppButton } from "@/components";
import styles from "@/components/Modal/ModalContents/modal.module.scss";
import { useAppSlice } from "@hooks";
import { pageRoutes } from "@/lib/router";

const RegisterError = ({ onClose }) => {
  const { redirectTo } = useAppSlice();
  return (
    <div className={styles.modalBody}>
      <img src="/assets/images/icon/error.png" alt="error"></img>
      <h1>Email is already registered!</h1>
      <p>
        This email is already registered. If it belongs to you and you’ve
        forgotten your password, you can reset it using the link below.
      </p>
      <AppButton onClick={onClose}>Close</AppButton>
      <div className={styles.footerAction}>
        Forgot your password?
        <AppButton
          variant="text"
          onClick={() => redirectTo(pageRoutes.FORGOT_PASSWORD.path)}
        >
          Reset Password
        </AppButton>
      </div>
    </div>
  );
};
export default RegisterError;
