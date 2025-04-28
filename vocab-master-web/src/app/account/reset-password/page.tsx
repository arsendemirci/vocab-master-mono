"use client";
import styles from "./page.module.scss";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppSlice } from "@hooks";
import { apiRoutes, pageRoutes } from "@/lib/router";
import { useEffect, useState } from "react";
import { muiStyles } from "@/config";
import { useSearchParams } from "next/navigation";
import Enum from "@enums";
const Page = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { redirectTo, showLoader, hideLoader } = useAppSlice();
  const searchParams = useSearchParams();
  const token = searchParams.get(Enum.Route.SearchKey.TOKEN);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors: submitErrors },
    watch,
  } = useForm({ mode: "all", reValidateMode: "onChange" });

  const onSubmitForm = async (data) => {
    showLoader();
    const resp = await apiRoutes.ACCOUNT_RESET_PASSWORD.call({
      password: data.password,
      code: token,
    });
    if (resp.status == Enum.Api.Response.Status.OK) {
      setShowInfo(true);
    }
    hideLoader();
  };

  const containerClass = `${styles.container}`;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showInfo) redirectTo(pageRoutes.ACCOUNT.path);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showInfo]);
  return (
    <div className={containerClass}>
      <form className={styles.formPart} onSubmit={handleSubmit(onSubmitForm)}>
        {showInfo && <ChangePasswordInfo />}
        {!showInfo && (
          <>
            <img src="/assets/images/icon/lock.png" alt="lock"></img>
            <h1>Reset your password?</h1>
            <p>Enter your desired password below to reset your password.</p>
            <TextField
              className={styles.textField}
              sx={muiStyles.form.textField}
              label="New Password *"
              fullWidth
              type="password"
              variant="outlined"
              error={!!submitErrors?.password}
              helperText={submitErrors?.password?.message?.toString()}
              {...register("password", {
                onChange: () => {
                  const rePassValue = getValues("rePassword");
                  if (rePassValue) {
                    trigger("rePassword");
                  }
                },
                required: "Please enter your password!",
              })}
            />
            <TextField
              className={styles.textField}
              sx={muiStyles.form.textField}
              label="Retype New Password *"
              fullWidth
              type="password"
              variant="outlined"
              error={!!submitErrors?.rePassword}
              helperText={submitErrors?.rePassword?.message?.toString()}
              {...register("rePassword", {
                required: "Please enter your password!",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            <Button
              variant="contained"
              className={styles.btnSubmit}
              type="submit"
            >
              Reset Password
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

const ChangePasswordInfo = () => {
  return (
    <>
      <img src="/assets/images/icon/check.png" alt="check"></img>
      <h1>Password has changed!</h1>
      <p>
        Your password has been changed successfully. You will be redirected to
        login...
      </p>
    </>
  );
};
export default Page;
