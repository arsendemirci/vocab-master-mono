import style from "./DataGrid.module.scss";
import { FC, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "@/types";
import { gridState } from "@/config";
import { GridStateEnum } from "@/config/enums";
import { setGridData } from "@/store/slices/gridSlice";
import axios from "axios";

const DataGrid: FC<{ gridType: GridStateEnum }> = ({ gridType }) => {
  const { columns, dataUrl } = gridState[gridType];
  const gridStore = useSelector((state: StoreType) => state.gridSlice);

  const dispatch = useDispatch();

  const [isOverflow, setIsOverflow] = useState(false);
  const refTable = useRef<HTMLDivElement>(null);
  const refArea = useRef<HTMLDivElement>(null);
  const isOverflowActive = (event: any) => {
    let isOverflowing = false;
    if (refArea.current) {
      const areaLength = refArea.current.offsetHeight;
      isOverflowing = event.scrollHeight > areaLength;
    }
    return isOverflowing;
  };

  useEffect(() => {
    if (isOverflowActive(refTable.current) && !isOverflow) {
      setIsOverflow(true);
    }
    if (!isOverflowActive(refTable.current) && isOverflow) {
      setIsOverflow(false);
    }
  });
  useEffect(() => {
    (async () => {
      const response = (await axios.get(dataUrl)).data;
      dispatch(setGridData(response));
    })();
  }, []);
  return (
    <>
      <div className={`${style.row} ${style.header}`}>
        {columns.map((col) => (
          <div key={col.key}>{col.header}</div>
        ))}
      </div>
      <div
        className={`${style.scroller} ${isOverflow && style.scrolling}`}
        ref={refArea}
      >
        <div className={style.table} ref={refTable}>
          {gridStore.tableData.length &&
            gridStore.tableData
              .filter(
                (item) =>
                  !gridStore.search ||
                  item.question
                    .toLowerCase()
                    .includes(gridStore.search.toLowerCase())
              )
              .map((l: any, index: any) => {
                return (
                  <div key={index} className={`${style.row}`}>
                    {columns.map((col) => (
                      <div key={col.key}>{l[col.key]}</div>
                    ))}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default DataGrid;
