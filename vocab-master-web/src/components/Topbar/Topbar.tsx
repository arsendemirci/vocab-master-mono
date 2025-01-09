import s from "./Topbar.module.scss";
import Image from "next/image";
import { usePersistSlice } from "@hooks";
function Topbar() {
  const { menuClass } = usePersistSlice();
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
