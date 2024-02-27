import React, { useEffect } from "react";

function useIPC() {
  useEffect(() => {
    return () => {
      window.api.close();
    };
  }, []);

  return window.api;
}

export default useIPC;
