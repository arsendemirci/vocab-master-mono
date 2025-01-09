import styles from "./ProfileMenu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "@/types";
// import { useSession } from "next-auth/react";
import ProfileButton from "./ProfileButton/ProfileButton";

const ProfileMenu = (props) => {
  const { user, menuClass } = useSelector(
    (state: StoreType) => state.persistSlice
  );
  // const { data } = useSession();
  // console.log("[RENDERING] ProfileCard Component", data);
  // const userState = useSelector((state:StoreType) => state);
  //const dispatch = useDispatch();
  const userName = user ? user.name : "Guest";
  const userImage = "/assets/images/avatar/guest.png";

  const clCard = `${styles.card} ${styles[menuClass]}`;
  const clImgBorder = `${styles.imgBorder}`;
  const clImg = `${styles.img}`;
  const clName = `${styles.name}`;
  const clButton = `${styles.button}`;

  return (
    <div className={clCard}>
      <div className={clImgBorder}>
        <img src={userImage} alt="card image" className={clImg} />
      </div>
      <h2 className={clName}>{userName}</h2>
      <ProfileButton className={clButton} />
    </div>
  );
};
export default ProfileMenu;
