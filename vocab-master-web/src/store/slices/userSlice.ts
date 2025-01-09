import { createSlice } from "@reduxjs/toolkit";
import { UserSliceType } from "@/types";
const initialState: UserSliceType = {
  user: {
    id: 0,
    email: "",
    name: "Guest",
    verified: false,
    image: "",
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
    setUserProfile: () => {
      console.log("setting profile info");
    },
    setUserInfo: (state, { payload }) => {
      state.user = { ...payload.user };
      state.profile = { ...payload.profile };
    },
    resetUserInfo: () => initialState,
  },
});

export const { setUserProfile, setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
