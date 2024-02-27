import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    id: 0,
    email: "",
    name: "Guest",
    verified: false,
  },
  profile: {
    id: 0,
    firstName: "",
    lastName: "",
    avatar: "guest.png",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state) => {
      console.log("setting profile info");
    },
    setUserInfo: (state, { payload }) => {
      console.log("payload storing", payload);
      state.user = { ...payload.user };
      state.profile = { ...payload.profile };
    },
    resetUserInfo: () => initialState,
  },
});

export const { setUserProfile, setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
