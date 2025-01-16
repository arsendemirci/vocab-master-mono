import { Icon } from "@/components";
import { Button } from "@mui/material";
import { useAppSlice } from "@hooks";
import { RoutePathEnum, IconEnum } from "@/config/enums";
import { signOut } from "next-auth/react";
import { usePersistSlice } from "@hooks";

const ProfileButton = ({ className }: { className?: string }) => {
  const { isAuthenticated } = usePersistSlice();
  const { redirectTo } = useAppSlice();
  const btnText = isAuthenticated ? "Sign Out" : "Sign In / Sign Up";
  const icon = isAuthenticated ? IconEnum.LOGOUT : IconEnum.ACCOUNT;

  const onClick = () => {
    if (!isAuthenticated) redirectTo(RoutePathEnum.ACCOUNT);
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
