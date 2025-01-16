import { createSlice } from "@reduxjs/toolkit";
import { AppSliceType } from "@/types";

const initialState: AppSliceType = {
  currentPath: "",
  pageClass: "page_open",
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
    setPageClass: (state, { payload }) => {
      state.pageClass = payload;
    },
    setCurrentPath: (state, { payload }) => {
      state.currentPath = payload;
    },
    showModal: (state, { payload }) => {
      state.modal = { show: true, ...payload };
    },
    setLoader: (state, { payload }) => {
      state.loader.show = payload;
    },
    hideModal: (state) => {
      state.modal.show = false;
    },
  },
});

export const { showModal, hideModal, setLoader, setPageClass, setCurrentPath } =
  appSlice.actions;
export default appSlice.reducer;
