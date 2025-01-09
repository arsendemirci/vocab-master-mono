import { createSlice } from "@reduxjs/toolkit";
import { PersistSliceType } from "@/types";

const initialState: PersistSliceType = {
  menuClass: "menu_open",
  isAuthenticated: false,
};
export const persistSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
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

export const { openMenu, closeMenu, toggleMenu, setAuthenticated } =
  persistSlice.actions;
export default persistSlice.reducer;
