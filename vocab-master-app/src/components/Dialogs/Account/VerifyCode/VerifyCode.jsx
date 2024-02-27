import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "#userSlice";
import styles from "./VerifyCode.module.scss";
import { useForm } from "react-hook-form";
import { Button, Icon } from "components";
import { Box, TextField } from "@mui/material";
import { useIPC } from "#hooks";
import validation from "#utils/validation.js";

const VerifyCode = (userId) => {
  // const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
  const dispatch = useDispatch();
  const ipc = useIPC();
  const onSubmit = async (data) => {
    e.preventDefault();
    console.log("submitted form ", data);
    const userData = await ipc.verifyUser(userId, data);
    if (userData.error) {
      const { code, msg } = userData.error;
      setError(msg);
    } else {
      dispatch(setUserInfo(userData));
    }
  };
  const clWrapper = `${styles.wrapper}`;
  return (
    <div className={clWrapper}>
      <h2>Enter Verification Code</h2>
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
