"use client";
import styles from "./page.module.scss";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAccountSlice, useAppSlice } from "@hooks";
import validation from "@/utils/validation";
import api from "@/service/clientService";
import { RoutePathEnum } from "@/config/enums";
import { muiStyles } from "@/config";
const Page = () => {
  // console.log("[RENDERING] Sign Component");
  const { redirectTo, showLoader, hideLoader } = useAppSlice();
  const { resetPasswordForm } = useAccountSlice();
  const {
    register: registerSubmit,
    handleSubmit,
    formState: { errors: submitErrors },
    reset: resetForm,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const onSubmitForm = async (data) => {
    showLoader();
    const resp = await api.account.resetPassword(data.email);
    hideLoader();
    console.log(`[CLIENT LOG] response from resetPasswordService`, resp);
  };

  const containerClass = `${styles.container}`;

  return (
    <div className={containerClass}>
      <form className={styles.formPart} onSubmit={handleSubmit(onSubmitForm)}>
        <img src="/assets/images/icon/lock.png" alt="lock"></img>
        <h1>Forgot your password?</h1>
        <p>
          Enter your e-mail adress below and you will receive a link to reset
          your password.
        </p>
        <TextField
          className={styles.textField}
          sx={muiStyles.form.textField}
          label="Email *"
          fullWidth
          type="text"
          variant="outlined"
          error={!!submitErrors?.email || !!resetPasswordForm.email.error}
          helperText={
            submitErrors?.email?.message?.toString() ||
            resetPasswordForm.email.msg
          }
          {...registerSubmit("email", validation.email)}
        />
        <Button variant="contained" className={styles.btnSubmit} type="submit">
          Send Reset Link
        </Button>
        <div className={styles.signup}>
          Dont have an account?
          <Button onClick={() => redirectTo(RoutePathEnum.ACCOUNT)}>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
