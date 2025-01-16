"use client";
import style from "./DataGrid.module.scss";
import { FC, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreType, DataGridCType } from "@/types";
import { RowAdder, RowEditor } from "@/components";
import { Fragment } from "react";
import { gridState } from "@/config";
import { GridActionStateEnum, RoutePathEnum } from "@/config/enums";
import { useAppSlice } from "@/hooks";
import {
  setGridData,
  addToGridData,
  setActionState,
} from "@/store/slices/gridSlice";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { formatString } from "@/utils/stringUtils";
import axios from "axios";
const DataGrid: FC<DataGridCType> = ({ gridType, ownerID, height }) => {
  const { columns, editUrl, editPostUrl, dataUrl, formData, deleteUrl } =
    gridState[gridType];

  const gridStore = useSelector((state: StoreType) => state.gridSlice);
  const { redirectTo } = useAppSlice();
  const dispatch = useDispatch();
  // const [height, setHeight] = useState(0);
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
    console.log("[CLIENT LOG] ", editPostUrl, item.id);
    if (editPostUrl) {
      const { id, ...form } = item;

      dispatch(setActionState({ id, action: GridActionStateEnum.EDIT, form }));
    } else if (editUrl) {
      const formattedString = formatString(editUrl, item.id);
      console.log("[CLIENT LOG onClickEdit formatString] ", formattedString);
      redirectTo(formattedString as RoutePathEnum);
    }
  };

  const onClickDelete = async (id: number) => {
    if (deleteUrl) {
      let method = "delete";
      let delData: any = { data: id };
      if (formData && formData.primaryKey && formData.ownerKey) {
        method = "post";
        delData = { [formData.primaryKey]: id, [formData.ownerKey]: ownerID };
      }

      const response = await axios[method](deleteUrl, delData);
      if (response?.data === "OK") {
        dispatch(setActionState({ id, action: GridActionStateEnum.DELETE }));
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
      const response = (await axios.get(formatString(dataUrl, ownerID))).data;
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
        style={{
          maxHeight: `calc(${style.scrollerHeight} - ${height || 0}px)`,
        }}
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
              .map((l: any) => {
                return (
                  <Fragment key={l.id}>
                    <div
                      className={`${style.row} 
                              
                                  ${
                                    gridStore.actionState[l.id] &&
                                    style[
                                      `${gridStore.actionState[l.id].action}`
                                    ]
                                  }`}
                    >
                      {columns.map((col) => (
                        <div key={col.key}>{l[col.key]}</div>
                      ))}
                      <div className={style.actions}>
                        <IconButton onClick={() => onClickEdit(l)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => onClickDelete(l.id)}>
                          <Delete color="error" />
                        </IconButton>
                      </div>
                    </div>
                    {gridStore.actionState[l.id] &&
                      gridStore.actionState[l.id].form && (
                        <RowEditor id={l.id} editPostUrl={editPostUrl} />
                      )}
                  </Fragment>
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
