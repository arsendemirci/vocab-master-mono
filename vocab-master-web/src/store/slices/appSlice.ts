import { createSlice } from "@reduxjs/toolkit";
import { AppSliceType } from "@/types";

const initialState: AppSliceType = {
  currentPath: "",
  pageClass: "page_open",
  menuClass: "menu_open",
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
    openPage: (state) => {
      state.pageClass = "page_open";
    },
    closePage: (state) => {
      state.pageClass = "page_closed";
    },
    setCurrentPath: (state, { payload }) => {
      state.currentPath = payload;
    },
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
    openMenu: (state) => {
      state.menuClass = "menu_open";
    },
    closeMenu: (state) => {
      state.menuClass = "menu_closed";
    },
    toggleMenu: (state) => {
      state.menuClass =
        state.menuClass === "menu_open" ? "menu_closed" : "menu_open";
    },
  },
});

export const {
  showModal,
  hideModal,
  showLoader,
  hideLoader,
  setPageClass,
  setCurrentPath,
  openMenu,
  closeMenu,
  toggleMenu,
  openPage,
  closePage,
} = appSlice.actions;
export default appSlice.reducer;
