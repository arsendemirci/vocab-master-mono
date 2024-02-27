import React, { useEffect, useState } from "react";
import splash from "../../assets/images/logo/splash.gif";
import style from "./SplashScreen.module.scss";
import { useIPC } from "#hooks";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, resetUserInfo } from "#userSlice";

const SplashScreen = () => {
  const user = useSelector((state) => state.userStore.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const ipc = useIPC();

  const wrapperClass = `${style.wrapper} ${!show && style.animated}`;
  useEffect(() => {
    if (user.id) {
      async function refreshToken() {
        const res = await ipc.refreshToken();
        if (!res.error) {
          dispatch(setUserInfo(res));
        } else {
          dispatch(resetUserInfo());
        }
      }
      refreshToken();
    } else {
      dispatch(resetUserInfo());
    }
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, []);
  return (
    <div className={wrapperClass}>
      <img src={splash} alt="splash" />
    </div>
  );
};

export default SplashScreen;
