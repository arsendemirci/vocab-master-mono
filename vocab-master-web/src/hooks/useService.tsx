import { useEffect, useState } from "react";
import axios from "axios";

const useService = <T,>(url, method) => {
  const [data, setData] = useState<T>(Object);

  useEffect(() => {
    (async () => {
      const response = await axios[method](url);
      setData(response.data);
    })();
  }, []);
  return data;
};

export default useService;
