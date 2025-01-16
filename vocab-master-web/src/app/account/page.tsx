"use client";
import styles from "./page.module.scss";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppSlice, useAccountSlice } from "@hooks";

import validation from "@/utils/validation";
import { signIn } from "next-auth/react";
import { RoutePathEnum } from "@/config/enums";
import { muiStyles } from "@/config";
import { Icon } from "@/components";
import { useState } from "react";
import api from "@/service/clientService";

const Page = () => {
  const [isLoginError, setLoginError] = useState<Boolean>(false);
  const inputs = {
    signin: { password: "pswLogin", email: "emailLogin" },
    signup: { name: "name", email: "emailSignup", password: "passwordSignup" },
  };
  const { showLoader, hideLoader, redirectTo } = useAppSlice();
  // console.log("[RENDERING] Sign Component");
  const { setActivePanel, activePanel, registerForm, loginForm } =
    useAccountSlice();

  const {
    register: registerSignin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
    setError,
    reset: resetSignin,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    register: registerSignup,
    handleSubmit: handleRegister,
    formState: { errors: registerErrors },
    reset: resetSignup,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const onSubmitLogin = async (data) => {
    showLoader();
    try {
      const res = await signIn("credentials", {
        redirect: false,

        username: data[inputs.signin.email],
        password: data[inputs.signin.password],
      });

      hideLoader();

      if (res?.error) {
        console.error("login response error", res);
        setLoginError(true);
        // setError(inputs.signin.password as string, {
        //   type: "custom",
        //   message: "ol artikkkkkkk",
        // });
        Object.values(inputs.signin).forEach((val) =>
          setError(val, { type: "custom" })
        );
      } else {
        redirectTo(RoutePathEnum.HOME);
      }
    } catch {
      console.log("login catch fail", data);
    }
  };
  const onSubmitRegister = async (data) => {
    const signup = {
      name: data[inputs.signup.name],
      email: data[inputs.signup.email],
      password: data[inputs.signup.password],
    };
    console.log("ARSEN - state trace - signup", signup);

    const response = await api.account.register(signup);
    console.log("ARSEN - state trace - response", response);

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
  const containerClass = `${styles.container} ${styles[activePanel]}`;
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
          <Icon type="png" icon="user" width={48} height={48} />
          <h1>Create Account</h1>
          <p>
            Please fill the form and submit, you will receive a verification
            link to confirm your account.
          </p>
          <TextField
            sx={muiStyles.form.textField}
            label="Name *"
            fullWidth
            type="text"
            variant="outlined"
            error={!!registerErrors?.name}
            helperText={registerErrors?.name?.message?.toString()}
            {...registerSignup(inputs.signup.name, validation.name)}
          />
          <TextField
            label="Email *"
            sx={muiStyles.form.textField}
            fullWidth
            type="text"
            variant="outlined"
            error={!!registerErrors?.email || registerForm.email.error}
            helperText={
              registerErrors?.email?.message?.toString() ||
              registerForm.email.msg
            }
            {...registerSignup(inputs.signup.email, validation.email)}
          />
          <TextField
            label="Password *"
            sx={muiStyles.form.textField}
            fullWidth
            type="password"
            variant="outlined"
            error={!!registerErrors?.password}
            helperText={registerErrors?.password?.message?.toString()}
            {...registerSignup(inputs.signup.password, validation.password)}
          />
          <Button
            variant="contained"
            type="submit"
            className={styles.btnSignin}
          >
            Sign Up
          </Button>
          <div className={styles.noAccount}>
            Already have an account?
            <Button onClick={() => setActivePanel({ panel: "login" })}>
              Sign In
            </Button>
          </div>
        </form>
      </div>
      <div className={signinClass}>
        <form className={styles.formPart} onSubmit={handleLogin(onSubmitLogin)}>
          <Icon type="png" icon="signin" />
          <h1>Sign in</h1>
          <p>Enter your credentials to sign in and start fun.</p>

          <TextField
            sx={muiStyles.form.textField}
            label="Email *"
            fullWidth
            type="text"
            variant="outlined"
            error={
              !!loginErrors?.[inputs.signin.email] || !!loginForm.email.error
            }
            helperText={
              loginErrors?.[inputs.signin.email]?.message?.toString() ||
              loginForm.email.msg
            }
            {...registerSignin(inputs.signin.email, validation.email)}
          />
          <TextField
            label="Password *"
            sx={muiStyles.form.textField}
            fullWidth
            type="password"
            variant="outlined"
            error={
              !!loginErrors?.[inputs.signin.password] ||
              !!loginForm.password.error
            }
            helperText={
              loginErrors?.[inputs.signin.password]?.message?.toString() ||
              loginForm.password.msg
            }
            {...registerSignin(inputs.signin.password, validation.password)}
          />
          <div className={styles.formAction}>
            {isLoginError && <p>* Email or password is incorrect!</p>}
            <Button
              variant="contained"
              className={styles.btnSignin}
              type="submit"
            >
              Sign In
            </Button>
          </div>

          <div className={styles.noAccount}>
            Forgot your password?
            <Button onClick={() => redirectTo(RoutePathEnum.RESET_PASSWORD)}>
              Reset Password
            </Button>
          </div>
          <div className={styles.noAccount}>
            Dont have an account?
            <Button onClick={() => setActivePanel({ panel: "register" })}>
              Sign Up
            </Button>
          </div>
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
              <a onClick={() => setActivePanel({ panel: "login" })}>
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
              <a onClick={() => setActivePanel({ panel: "register" })}>
                <strong>here</strong>
              </a>
              &nbsp; to create.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
