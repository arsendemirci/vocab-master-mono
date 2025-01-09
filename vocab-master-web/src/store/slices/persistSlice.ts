import { createSlice } from "@reduxjs/toolkit";
import { PersistSliceType } from "@/types";

const initialState: PersistSliceType = {
  menuClass: "menu_open",
};
export const persistSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      state.user = payload.user;
    },
    signOut: () => initialState,
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

export const { openMenu, closeMenu, toggleMenu, signIn, signOut } =
  persistSlice.actions;
export default persistSlice.reducer;
