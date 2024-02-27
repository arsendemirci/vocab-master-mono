import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: { show: false },
  modal: {
    show: false,
    component: "",
  },
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.modal = { show: true, ...payload };
    },
    showLoader: (state) => {
      state.loader.show = true;
    },
    hideModal: (state) => {
      state.modal.show = false;
    },
    hideLoader: (state) => {
      state.loader.show = false;
    },
  },
});

export const { showModal, hideModal, showLoader, hideLoader } =
  appSlice.actions;
export default appSlice.reducer;
