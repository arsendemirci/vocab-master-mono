import styles from "./ProfileMenu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { StoreType } from "@/types";
import { Icon } from "@/components";
// import {userSlice} from '@/store/slices/userSlice';
// import { resetUserInfo } from "#userSlice";
// import { showModal } from "#appSlice";
// import { dialog } from "components/Dialogs";

import { Button } from "@mui/material";
const ProfileMenu = (props) => {
  console.log("[RENDERING] ProfileCard Component");
  // const userState = useSelector((state:StoreType) => state);
  const dispatch = useDispatch();

  const menuClass = useSelector((state: StoreType) => state.appSlice.menuClass);
  const clCard = `${styles.card} ${styles[menuClass]}`;
  const clImgBorder = `${styles.imgBorder}`;
  const clImg = `${styles.img}`;
  const clName = `${styles.name}`;
  const clButton = `${styles.button}`;
  // const buttonLabel = `${userState.user.id ? "Sign Out" : "Sign In / Sign Up"}`;

  const onButtonClick = () => {
    // if (userState.user.id) {
    //   ipc.signout();
    //   dispatch(resetUserInfo());
    // } else {
    //   dispatch(showModal({ component: dialog.ACCOUNT }));
    // }
  };
  return (
    <div className={clCard}>
      <div className={clImgBorder}>
        <Image
          src={require("../../../assets/images/avatar/guest.png").default}
          alt="card image"
          className={clImg}
        />
      </div>
      <h2 className={clName}>Arsen Gregor </h2>
      <Button variant="contained" className={clButton} onClick={onButtonClick}>
        <Icon icon="login" /> <label>Sign In / Sign Up</label>
      </Button>
    </div>
  );
};
export default ProfileMenu;
