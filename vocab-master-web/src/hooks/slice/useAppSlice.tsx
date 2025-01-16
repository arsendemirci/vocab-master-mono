import { RoutePathEnum } from "@/config/enums";
import { setCurrentPath, setLoader, setPageClass } from "@slice/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/types";

const useAppSlice = () => {
  const appStore = useSelector((state: StoreType) => state.appSlice);
  const dispatch = useDispatch();

  const redirectTo = (path: RoutePathEnum) => {
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
    ...appStore,
  };
};

export default useAppSlice;
