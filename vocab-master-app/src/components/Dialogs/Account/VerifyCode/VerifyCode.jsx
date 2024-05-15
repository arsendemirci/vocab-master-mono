import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "#userSlice";
import styles from "./VerifyCode.module.scss";
import { useForm } from "react-hook-form";
import { Button, Icon } from "components";
import { Box, TextField } from "@mui/material";
import { useIPC, useAppState } from "#hooks";
import validation from "#utils/validation.js";

const VerifyCode = ({ userId }) => {
  const [error, setError] = useState("");
  const { showLoader, hideLoader, hideModal } = useAppState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
  const dispatch = useDispatch();
  const ipc = useIPC();
  const onSubmit = async (data) => {
    showLoader();
    const userData = await ipc.verifyUser(userId, data.code);
    hideLoader(() => {
      if (userData.error) {
        const { code, msg } = userData.error;
        setError(msg);
      } else {
        dispatch(setUserInfo(userData));
        hideModal();
      }
    });
  };
  const clWrapper = `${styles.wrapper}`;
  return (
    <div className={clWrapper}>
      <h2>Email Verification</h2>
      <hr />
      <p>
        To verify your email, enter the 5 digit verification code that has been
        sent to your email.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="code"
          label="Verification Code"
          type="text"
          variant="outlined"
          error={errors.code || error}
          helperText={errors?.code?.message || error}
          {...register("code", validation.verificationCode)}
        />
        <Button type="submit">Verify</Button>
      </form>
    </div>
  );
};

export default VerifyCode;
