import s from "./Sidebar.module.scss";
import { Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { SideMenu, ProfileMenu } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "@slice/persistSlice";
import { StoreType } from "@/types";
import Image from "next/image";
import { usePersistSlice } from "@hooks";

function Sidebar() {
  const dispatch = useDispatch();
  const { menuClass } = usePersistSlice();
  return (
    <div className={`${s.main} ${s[menuClass]}`}>
      <div className={s.leftTop}>
        <Image
          className={s.logo}
          src={require("../../assets/images/logo/vm_logo.png").default}
          alt="logo"
        />
      </div>
      <div className={s.menuContainer}>
        <Button
          className={`${s.menuButton} ${s[menuClass]}`}
          type="button"
          variant="text"
          onClick={() => dispatch(toggleMenu())}
        >
          <KeyboardArrowLeft className={s.leftIcon} />
          <KeyboardArrowRight className={s.rightIcon} />
          <label>Lite Menu</label>
        </Button>
        <div className={s.wrapper}>
          <div className={s.scrollbox}>
            <SideMenu />
          </div>
        </div>
      </div>
      <div className={s.profileContainer}>
        <ProfileMenu />
      </div>
    </div>
  );
}
export default Sidebar;
