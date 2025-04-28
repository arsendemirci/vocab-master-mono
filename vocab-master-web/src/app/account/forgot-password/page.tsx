"use client";
import styles from "./page.module.scss";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAccountSlice, useAppSlice } from "@hooks";
import validation from "@/utils/validation";
import { muiStyles } from "@/config";
import { pageRoutes, apiRoutes } from "@/lib/router";
import { useState } from "react";
const Page = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { redirectTo, showLoader, hideLoader } = useAppSlice();
  const { resetPasswordForm } = useAccountSlice();
  const {
    register: registerSubmit,
    handleSubmit,
    setError,
    formState: { errors },
    reset: resetForm,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const onSubmitForm = async (data) => {
    showLoader();

    const resp = await apiRoutes.ACCOUNT_FORGOT_PASSWORD.call({
      email: data.email,
    });

    if (resp.error) {
      setError("server", { type: "custom", message: resp.error });
    } else {
      setShowInfo(true);
    }
    hideLoader();
  };

  const containerClass = `${styles.container}`;

  return (
    <div className={containerClass}>
      <form className={styles.formPart} onSubmit={handleSubmit(onSubmitForm)}>
        <img src="/assets/images/icon/lock.png" alt="lock"></img>
        {showInfo && <ResetLinkSentInfo redirectTo={redirectTo} />}
        {!showInfo && (
          <>
            <h1>Forgot your password?</h1>
            <p>
              Enter your e-mail adress below and you will receive a link to
              reset your password.
            </p>
            <TextField
              className={styles.textField}
              sx={muiStyles.form.textField}
              label="Email *"
              fullWidth
              type="text"
              variant="outlined"
              error={!!errors?.email || !!resetPasswordForm.email.error}
              helperText={
                errors?.email?.message?.toString() ||
                resetPasswordForm.email.msg
              }
              {...registerSubmit("email", validation.email)}
            />
            <div className={styles.formAction}>
              {errors.server && <p>* {errors.server.message as string}</p>}
              <Button
                variant="contained"
                className={styles.btnSubmit}
                type="submit"
              >
                Send Reset Link
              </Button>
            </div>
            <div className={styles.signup}>
              Dont have an account?
              <Button onClick={() => redirectTo(pageRoutes.ACCOUNT.path)}>
                Sign Up
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

const ResetLinkSentInfo = ({ redirectTo }) => {
  return (
    <>
      <h1>Check your e-mail.</h1>
      <p>
        We've sent a password reset link to your email address. Please check
        your inbox and follow the instructions.
      </p>
      <div className={styles.formAction}>
        <Button
          onClick={() => redirectTo(pageRoutes.ACCOUNT.path)}
          variant="contained"
          className={styles.btnSubmit}
          type="button"
        >
          Back To Login
        </Button>
      </div>
    </>
  );
};
export default Page;
