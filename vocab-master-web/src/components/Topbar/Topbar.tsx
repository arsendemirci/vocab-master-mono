import { StoreType } from "@/types";
import s from "./Topbar.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";

function Topbar() {
  const menuClass = useSelector((state: StoreType) => state.appSlice.menuClass);
  return (
    <div className={`${s.topBar} ${s[menuClass]}`}>
      <div className={s.topBarLogo}>
        <Image
          src={require("../../assets/images/logo/brand_menu.png").default}
          alt="logo"
        />
      </div>
      <div className={s.topBarContent}>Lorem Ipsum for now</div>
    </div>
  );
}
export default Topbar;
