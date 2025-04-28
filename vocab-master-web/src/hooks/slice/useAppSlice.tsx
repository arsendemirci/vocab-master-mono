import { setCurrentPath, setLoader, setPageClass } from "@slice/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/types";

const useAppSlice = () => {
  const appStore = useSelector((state: StoreType) => state.appSlice);
  const dispatch = useDispatch();

  const redirectTo = (path: string) => {
    dispatch(setCurrentPath(path));
  };
  const openPage = () => dispatch(setPageClass("page_open"));
  const closePage = () => dispatch(setPageClass("page_closed"));
  const showLoader = () => dispatch(setLoader(true));
  const hideLoader = () => dispatch(setLoader(false));

  return {
    redirectTo,
    showLoader,
    hideLoader,
    openPage,
    closePage,
    path: appStore.currentPath.split("?")[0],
    ...appStore,
  };
};

export default useAppSlice;
