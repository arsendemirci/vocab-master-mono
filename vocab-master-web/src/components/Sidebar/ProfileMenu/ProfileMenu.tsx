import styles from "./ProfileMenu.module.scss";

import { usePersistSlice } from "@/hooks";
import ProfileButton from "./ProfileButton/ProfileButton";

const ProfileMenu = () => {
  const { currentUser, menuClass } = usePersistSlice();

  const userName = currentUser ? currentUser.name : "Guest";
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
