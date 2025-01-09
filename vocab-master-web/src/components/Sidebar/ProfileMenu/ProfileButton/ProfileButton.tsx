import { Icon } from "@/components";
import { Button } from "@mui/material";
import { setCurrentPath } from "@/store/slices/appSlice";
import { RoutePathEnum } from "@/config/enums";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { usePersistSlice } from "@hooks";

const ProfileButton = ({ className }: { className?: string }) => {
  const { isAuthenticated } = usePersistSlice();
  const dispatch = useDispatch();
  const btnText = isAuthenticated ? "Sign Out" : "Sign In / Sign Up";
  const icon = isAuthenticated ? "power" : "login";

  const onClick = () => {
    if (!isAuthenticated) dispatch(setCurrentPath(RoutePathEnum.ACCOUNT));
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
