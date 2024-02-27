import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "#userSlice";

function Profile() {
  const userState = useSelector((state) => state.userStore);
  console.log("user state", userState);
  const dispatch = useDispatch();
  const setProfile = () => {
    dispatch(setUserProfile());
  };
  return (
    <div>
      <section>
        <h2>This Profile Page</h2>
        <h3> current user id is {userState.user.id}</h3>
        <h3> current profile id is {userState.profile.id}</h3>
        <h3> current user name is {userState.user.name}</h3>
        <h3> current user email is {userState.user.email}</h3>
        <h3> current user avatar is {userState.profile.avatar}</h3>
        <div>
          Proggress of the user and status will be displayed in this page
          <button onClick={setProfile}>Set UserProfile</button>
        </div>
      </section>
    </div>
  );
}

export default Profile;
