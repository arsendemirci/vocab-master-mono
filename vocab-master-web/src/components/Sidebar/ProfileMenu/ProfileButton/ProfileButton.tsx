import { Icon } from "@/components";
import { Button } from "@mui/material";
import { setCurrentPath } from "@/store/slices/appSlice";
import { RoutePathEnum } from "@/config/enums";
import { StoreType } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "next-auth/react";

const ProfileButton = ({ className }: { className?: string }) => {
  const isAuth = useSelector(
    (state: StoreType) => state.persistSlice.isAuthenticated
  );
  const dispatch = useDispatch();
  const btnText = isAuth ? "Sign Out" : "Sign In / Sign Up";
  const icon = isAuth ? "power" : "login";

  const onClick = () => {
    if (!isAuth) dispatch(setCurrentPath(RoutePathEnum.ACCOUNT));
    else {
      signOut();
    }
  };

  return (
    <Button variant="contained" className={className} onClick={onClick}>
      <Icon icon={icon} /> <label>{btnText}</label>
    </Button>
  );
};
export default ProfileButton;
