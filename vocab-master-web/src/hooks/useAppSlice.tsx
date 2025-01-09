import { useEffect, useRef, useState } from "react";
import { RoutePathEnum } from "@/config/enums";
import { setCurrentPath } from "@/store/slices/appSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

const useAppSlice = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const redirect = (path: RoutePathEnum) => {
    dispatch(setCurrentPath(path));
  };
  return [redirect];
};

export default useAppSlice;
