"use client";
import style from "./DataGrid.module.scss";
import { FC, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreType, DataGridCType } from "@/types";
import { RowAdder } from "@/components";
import { setCurrentPath } from "@/store/slices/appSlice";
import { gridState } from "@/config";
import {
  setGridData,
  addToGridData,
  deleteRow,
} from "@/store/slices/gridSlice";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";

const DataGrid: FC<DataGridCType> = ({ gridType, ownerID }) => {
  const { columns, editUrl, dataUrl, formData, deleteUrl } =
    gridState[gridType];
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
  const onClickEdit = (item: any) => {
    if (editUrl) {
      dispatch(setCurrentPath(editUrl(item.id)));
    }
  };
  const onClickDelete = async (id: number) => {
    if (deleteUrl) {
      const response = await axios.delete(deleteUrl(), { data: id });
      if (response?.data === "OK") {
        dispatch(deleteRow(id));
      }
    }
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
      const response = (await axios.get(dataUrl(ownerID))).data;
      dispatch(setGridData(response));
    })();
  }, []);

  return (
    <>
      <div
        className={`${style.row} ${style.header} ${
          isOverflow && style.overflow
        }`}
      >
        {columns.map((col) => (
          <div key={col.key}>{col.header}</div>
        ))}
        <div key="actions">Actions</div>
      </div>
      <div
        className={`${style.scroller} ${isOverflow && style.scrolling}`}
        ref={refArea}
      >
        <div className={style.table} ref={refTable}>
          {!!formData && (
            <RowAdder
              onSave={(addData: any) => dispatch(addToGridData(addData))}
              rowStyle={style.row}
              formData={formData}
              ownerId={ownerID}
            />
          )}
          {!!gridStore.tableData.length &&
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
                  <div key={l.id} className={`${style.row}`}>
                    {columns.map((col) => (
                      <div key={col.key}>{l[col.key]}</div>
                    ))}
                    <div key={`actions_${index}`}>
                      <IconButton onClick={() => onClickEdit(l)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => onClickDelete(l.id)}>
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
          {!gridStore.tableData.length && (
            <div className={style.noData}>There is nothing to display!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default DataGrid;
