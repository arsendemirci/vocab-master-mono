import React, { useEffect, useState } from "react";
import styles from "./Sign.module.scss";
import { Box, TextField, Button } from "@mui/material";
// import { Button, Icon } from "components";
// import {  useAppState } from "#hooks";
import { useForm } from "react-hook-form";
// import { httpConfig } from "#config";
import { useSelector, useDispatch } from "react-redux";
// import { setUserInfo, resetUserInfo } from "#userSlice";
import {
  validateLogin,
  validateRegister,
  setActivePanel,
} from "@/store/slices/accountSlice";
import validation from "@/utils/validation";
import { StoreType } from "@types";

function Page() {
  console.log("[RENDERING] Sign Component");
  // const { showLoader, hideLoader, hideModal } = useAppState();
  const account = useSelector((state: StoreType) => state.accountSlice);
  const dispatch = useDispatch();

  const {
    register: registerSignin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
    reset: resetSignin,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
  const {
    register: registerSignup,
    handleSubmit: handleRegister,
    formState: { errors: registerErrors },
    reset: resetSignup,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const onSubmitLogin = async (data) => {
    // showLoader();
    // const loginData = await ipc.login(data.email, data.password);
    // hideLoader(() => {
    //   if (loginData.error) {
    //     const { code, msg } = loginData.error;
    //     const loginForm = {
    //       email: {
    //         error: code === httpConfig.errorCode.INVALID_EMAIL,
    //         msg: code === httpConfig.errorCode.INVALID_EMAIL && msg,
    //       },
    //       password: {
    //         error: code === httpConfig.errorCode.INVALID_PASSWORD,
    //         msg: code === httpConfig.errorCode.INVALID_PASSWORD && msg,
    //       },
    //     };
    //     dispatch(validateLogin({ loginForm }));
    //   } else {
    //     resetSignin();
    //     dispatch(setUserInfo(loginData));
    //     hideModal();
    //   }
    // });
  };
  const onSubmitRegister = async (data) => {
    // const registerData = await ipc.register(
    //   data.name,
    //   data.email,
    //   data.password
    // );
    // if (registerData.error) {
    //   const { code, msg } = registerData.error;
    //   const registerEmailValidation = {
    //     error: code === httpConfig.errorCode.REGISTERED_EMAIL,
    //     msg: code === httpConfig.errorCode.REGISTERED_EMAIL && msg,
    //   };
    //   dispatch(validateRegister({ registerEmailValidation }));
    // } else {
    //   resetSignup();
    //   dispatch(
    //     setActivePanel({ panel: "verify", userId: registerData.userId })
    //   );
    // }
  };
  const containerClass = `${styles.container} ${styles[account.activePanel]}`;
  const signinClass = `${styles.form} ${styles.signin}`;
  const signupClass = `${styles.form} ${styles.signup}`;
  const panelLeft = `${styles.panel} ${styles.panelLeft}`;
  const panelRight = `${styles.panel} ${styles.panelRight}`;

  return (
    <div className={containerClass}>
      <div className={signupClass}>
        <form
          className={styles.formPart}
          onSubmit={handleRegister(onSubmitRegister)}
        >
          <h1>Create Account</h1>
          <TextField
            label="Name *"
            type="text"
            variant="outlined"
            error={!!registerErrors?.name}
            helperText={registerErrors?.name?.message}
            {...registerSignup("name", validation.name)}
          />
          <TextField
            label="Email *"
            type="text"
            variant="outlined"
            error={!!registerErrors?.email || account.registerForm.email.error}
            helperText={
              registerErrors?.email?.message || account.registerForm.email.msg
            }
            {...registerSignup("email", validation.email)}
          />
          <TextField
            label="Password *"
            type="password"
            variant="outlined"
            error={!!registerErrors?.password}
            helperText={registerErrors?.password?.message}
            {...registerSignup("password", validation.password)}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
      <div className={signinClass}>
        <form className={styles.formPart} onSubmit={handleLogin(onSubmitLogin)}>
          <h1>Sign in</h1>
          <TextField
            name="email"
            label="Email *"
            type="text"
            variant="outlined"
            error={!!loginErrors?.email || !!account.loginForm.email.error}
            helperText={
              loginErrors?.email?.message || account.loginForm.email.msg
            }
            {...registerSignin("email", validation.email)}
          />
          <TextField
            name="password"
            label="Password *"
            type="password"
            variant="outlined"
            error={
              !!loginErrors?.password || !!account.loginForm.password.error
            }
            helperText={
              loginErrors?.password?.message || account.loginForm.password.msg
            }
            {...registerSignin("password", validation.password)}
          />
          <a href="#">Forgot your password?</a>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
      <div className={styles.overlayWrap}>
        <div className={styles.overlay}>
          <div className={panelLeft}>
            <h1>Hello, Friend!</h1>
            <p>
              Create your VM account to start playing with a personalized
              experience!
            </p>
            <p>
              If you already have an account click &nbsp;
              <a onClick={() => dispatch(setActivePanel({ panel: "login" }))}>
                <strong>here</strong>
              </a>
              &nbsp; to login.
            </p>
            {/* <Button onClick={() => setActiveRight("")}>Sign In</Button> */}
          </div>
          <div className={panelRight}>
            <h1>Welcome Back!</h1>
            <p>Login to your VM account entering your e-mail and password.</p>
            <p>
              If you dont have a VM account click &nbsp;
              <a
                onClick={() => dispatch(setActivePanel({ panel: "register" }))}
              >
                <strong>here</strong>
              </a>
              &nbsp; to create.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
