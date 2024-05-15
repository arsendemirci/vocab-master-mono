import React from "react";
import styles from "./ProfileCard.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { resetUserInfo } from "#userSlice";
import { showModal } from "#appSlice";
import { dialog } from "components/Dialogs";

import { Button } from "components";

const ProfileCard = (props) => {
  console.log("[RENDERING] ProfileCard Component");
  const userState = useSelector((state) => state.userStore);
  const avatars = require.context("../../../assets/images/avatar", true);
  const dispatch = useDispatch();
  const avatarImage = avatars(
    `./${userState.profile.avatar || "guest.png"}`
  ).default;
  const clCard = `${styles.card}`;
  const clImgBorder = `${styles.imgBorder}`;
  const clImg = `${styles.img}`;
  const clName = `${styles.name}`;
  const clButton = `${styles.button}`;
  const buttonLabel = `${userState.user.id ? "Sign Out" : "Sign In / Sign Up"}`;

  const onButtonClick = () => {
    if (userState.user.id) {
      dispatch(resetUserInfo());
    } else {
      dispatch(showModal({ component: dialog.ACCOUNT }));
    }
  };
  return (
    <div className={clCard}>
      <div className={clImgBorder}>
        <img src={avatarImage} alt="card image" className={clImg} />
      </div>
      <h5 className={clName}>{userState.user.name}</h5>
      <Button className={clButton} onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
};
export default ProfileCard;
