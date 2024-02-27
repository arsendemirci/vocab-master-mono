import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Button, Icon } from "components";
import { dialogComponents, dialog } from "components/Dialogs";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "#appSlice";

const LoadDialog = (props) => {
  if (typeof dialogComponents[props.component] !== "undefined") {
    return React.createElement(dialogComponents[props.component]);
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

  useEffect(() => {
    if (modal.show) {
      console.log("modal is showing");
      setShow(true);
    } else {
      console.log("modal is hiding");
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
          <Button onClick={closeClick}>
            <Icon icon="times" width={24} height={24} color="white" />
          </Button>
          <div className={containerClass}>
            {LoadDialog({ component: modal.component })}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
