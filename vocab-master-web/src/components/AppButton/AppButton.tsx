import { Button } from "@mui/material";
import styles from "./AppButton.module.scss";

const AppButton = ({
  type,
  onClick,
  variant,
  theme = "primary",
  children,
}: any) => {
  return (
    <Button
      onClick={onClick}
      variant={variant || "contained"}
      className={!variant ? styles[theme || "primary"] : ""}
      type={type || "button"}
    >
      {children}
    </Button>
  );
};

export default AppButton;
