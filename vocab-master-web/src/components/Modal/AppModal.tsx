import React from "react";
import { Modal, Box, Fade, Backdrop } from "@mui/material";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const AppModal = ({
  open,
  onClose,
  children,
  title,
  Transition = Fade, // default is Grow, can be changed to Fade, Slide, etc.
  style = {},
}: {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
  Transition?: React.ElementType;
  style?: React.CSSProperties;
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}
    >
      <Transition in={open}>
        <Box sx={{ ...defaultStyle, ...style }}>{children}</Box>
      </Transition>
    </Modal>
  );
};

export default AppModal;
