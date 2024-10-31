import s from "./Sidebar.module.scss";
import { Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { SideMenu } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "@/store/slices/appSlice";
import { StoreType } from "@/types";

function Sidebar() {
  console.log("[RENDERING] Sidebar Component");
  const dispatch = useDispatch();
  const menuClass = useSelector((state: StoreType) => state.appSlice.menuClass);
  return (
    <div className={`${s.main} ${s[menuClass]}`}>
      <div className={s.leftTop}></div>
      <div className={s.container}>
        <Button
          className={`${s.menuButton} ${s[menuClass]}`}
          type="button"
          variant="text"
          onClick={() => dispatch(toggleMenu())}
        >
          <KeyboardArrowLeft className={s.leftIcon} />
          <KeyboardArrowRight className={s.rightIcon} />
        </Button>
        <div className={s.wrapper}>
          <div className={s.scrollbox}>
            <SideMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
