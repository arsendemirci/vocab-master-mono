import "./Topbar.scss";
import Image from "next/image";

function Topbar() {
  return (
    <div className="top-bar">
      <div className="top-bar-logo">
        <Image
          src={require("../../assets/images/logo/brand_menu.png").default}
          alt="logo"
        />
      </div>
      <div className="top-bar-content">Lorem Ipsum for now</div>
    </div>
  );
}
export default Topbar;
