import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Button, Icon, IconButton } from "components";
import { dialogComponents, dialog } from "components/Dialogs";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "#appSlice";

const LoadDialog = (props) => {
  // console.log(
  //   "props component",
  //   props,
  //   (({ show, component, ...rest }) => rest)(props)
  // );
  if (typeof dialogComponents[props.component] !== "undefined") {
    return React.createElement(dialogComponents[props.component], { ...props });
  }
  return React.createElement(() => (
    <div>The component has not been created yet.</div>
  ));
};

function Modal() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const modal = useSelector((state) => state.appStore.modal);
  const closeClick = () => {
    dispatch(hideModal());
  };
  let wrapperClass = `${styles.wrapper} ${show && styles.show}`;
  const containerClass = `${styles.container}`;
  const clClose = `${styles.close}`;

  useEffect(() => {
    if (modal.show) {
      setShow(true);
    } else {
      setShow(false);
    }
    // if (hidden) {
    //   setTimeout(() => {
    //     dispatch(hideModal());
    //     setHidden(false);
    //   }, 700);
    // }
  }, [modal.show]);
  return createPortal(
    <>
      <div className={wrapperClass}>
        <div>
          <div className={containerClass}>
            <IconButton
              className={clClose}
              iconName="close"
              iconColor="black"
              onClick={closeClick}
            />
            {LoadDialog({ ...modal })}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
