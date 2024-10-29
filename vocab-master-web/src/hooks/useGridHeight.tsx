import { useEffect, useRef, useState } from "react";

const useGridHeight = () => {
  const [gridHeight, setGridHeight] = useState<any>(0);
  const elRef = useRef<any>(null);

  useEffect(() => {
    if (elRef.current) {
      const compStyle = getComputedStyle(elRef.current);
      const refHeight = parseInt(compStyle.height);
      const paddingBottom = parseInt(compStyle.paddingBottom);
      const paddingTop = parseInt(compStyle.paddingTop);
      const marginBottom = parseInt(compStyle.marginBottom);
      const marginTop = parseInt(compStyle.marginTop);
      const sumSpace =
        refHeight + paddingBottom + paddingTop + marginBottom + marginTop;

      console.log("padding values", sumSpace);
      setGridHeight(sumSpace);
    }
  }, []);
  return [elRef, gridHeight];
};

export default useGridHeight;
