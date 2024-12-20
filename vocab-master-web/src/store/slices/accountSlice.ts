import { createSlice } from "@reduxjs/toolkit";
import { AccountSliceType } from "@/types";
const initialState: AccountSliceType = {
  activePanel: "login",
  registeredUserId: 0,
  loginForm: {
    email: {
      error: false,
      msg: "",
    },
    password: {
      error: false,
      msg: "",
    },
  },
  registerForm: {
    email: {
      error: false,
      msg: "",
    },
  },
};
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setActivePanel: (state, { payload }) => {
      state.activePanel = payload.panel;
      if (payload.userId) {
        state.registeredUserId = payload.userId;
      }
    },

    validateLogin: (state, { payload }) => {
      console.log("payload", payload);
      state.loginForm = payload.loginForm;
    },
    validateRegister: (state, { payload }) => {
      state.registerForm.email = payload.registerEmailValidation;
    },
  },
});

export const { validateLogin, validateRegister, setActivePanel } =
  accountSlice.actions;
export default accountSlice.reducer;
