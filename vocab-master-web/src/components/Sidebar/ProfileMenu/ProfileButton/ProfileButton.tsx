import { Icon } from "@/components";
import { Button } from "@mui/material";
import { useAppSlice } from "@hooks";
import { signOut } from "next-auth/react";
import { usePersistSlice } from "@hooks";
import { pageRoutes } from "@/lib/router";
import Enum from "@enums";

const ProfileButton = ({ className }: { className?: string }) => {
  const { isAuthenticated } = usePersistSlice();
  const { redirectTo } = useAppSlice();
  const btnText = isAuthenticated ? "Sign Out" : "Sign In / Sign Up";
  const icon = isAuthenticated ? Enum.Icon.LOGOUT : Enum.Icon.ACCOUNT;

  const onClick = () => {
    if (!isAuthenticated) redirectTo(pageRoutes.ACCOUNT.path);
    else {
      signOut();
    }
  };

  return (
    <Button variant="contained" className={className} onClick={onClick}>
      <Icon icon={icon} /> <label style={{ lineHeight: "1" }}>{btnText}</label>
    </Button>
  );
};
export default ProfileButton;
