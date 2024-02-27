import React from "react";
import { useIPC } from "#hooks";
import { useDispatch } from "react-redux";
import { showLoader } from "#appSlice";

function Home() {
  const ipc = useIPC((state) => state.userStore);
  const dispatch = useDispatch();

  return (
    <div>
      Home
      <button onClick={() => dispatch(showLoader())}>test storage</button>
    </div>
  );
}

export default Home;
