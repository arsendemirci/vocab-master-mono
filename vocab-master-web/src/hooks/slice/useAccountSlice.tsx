import {
  setActivePanel,
  validateResetPasswordForm,
  validateLoginForm,
  validateRegisterForm,
} from "@slice/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/types";

const useAccountSlice = () => {
  const accountStore = useSelector((state: StoreType) => state.accountSlice);
  const dispatch = useDispatch();

  return {
    setActivePanel: (payload) => dispatch(setActivePanel(payload)),
    validateLoginForm: (payload) => dispatch(validateLoginForm(payload)),
    validateResetPasswordForm: (payload) =>
      dispatch(validateResetPasswordForm(payload)),
    validateRegisterForm: (payload) => dispatch(validateRegisterForm(payload)),
    ...accountStore,
  };
};

export default useAccountSlice;
