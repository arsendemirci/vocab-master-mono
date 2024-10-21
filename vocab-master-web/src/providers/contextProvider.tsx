"use client";
import { createContext, useState } from "react";
import { AppContextProviderType } from "@types";

const AppContext = createContext({
  currentPath: "/home",
  pageClass: "",
  setPath: (path: string) => {},
  setPageClassName: (name: string) => {},
});

const AppContextProvider = ({
  currentPath,
  pageClass,
  children,
}: AppContextProviderType) => {
  const [appPath, setPath] = useState<string>(currentPath);
  const [pageClassName, setPageClassName] = useState<string>("");

  const context = {
    currentPath: appPath,
    pageClass: pageClassName,
    setPath: (path: string) => setPath(path),
    setPageClassName: (path: string) => setPageClassName(path),
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };
