import React, { useEffect } from "react";
import { hideLoader, showLoader, hideModal, showModal } from "#appSlice";

import { useSelector, useDispatch } from "react-redux";
// Hook
function useAppState() {
  const appState = useSelector((state) => state.appStore);
  const userState = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const loaderShow = () => {
    dispatch(showLoader());
  };
  const loaderHide = (actionOnHide) => {
    setTimeout(() => {
      dispatch(hideLoader());
      actionOnHide && actionOnHide();
    }, 2500);
  };
  const modalShow = (component) => {
    dispatch(showModal({ component }));
  };
  const modalHide = () => {
    dispatch(hideModal());
  };

  return {
    userId: userState.user.id,
    showLoader: loaderShow,
    showModal: modalShow,
    hideLoader: loaderHide,
    hideModal: modalHide,
  };
}

export default useAppState;
