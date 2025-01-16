import { signIn, signOut } from "@slice/persistSlice";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "@/types";

const usePersistSlice = () => {
  const dispatch = useDispatch();

  const store = useSelector((state: StoreType) => state.persistSlice);

  return {
    isAuthenticated: store.user && store.user.accessToken ? true : false,
    currentUser: store.user,
    menuClass: store.menuClass,
    signIn: (payload) => dispatch(signIn(payload)),
    signOut: () => dispatch(signOut()),
  };
};

export default usePersistSlice;
