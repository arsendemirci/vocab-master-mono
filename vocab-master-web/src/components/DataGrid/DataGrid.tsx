"use client";
import style from "./DataGrid.module.scss";
import { FC, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreType, DataGridCType } from "@/types";
import { RowAdder, RowEditor, Spinner } from "@/components";
import { Fragment } from "react";
import { gridState } from "@/config";
import { useAppSlice } from "@/hooks";

import {
  setGridData,
  addToGridData,
  setActionState,
} from "@/store/slices/gridSlice";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Enum from "@enums";
const DataGrid: FC<DataGridCType> = ({ gridType, ownerID, height }) => {
  const {
    primaryKey,
    columns,
    editRoute,
    editPostRoute,
    dataRoute,
    formData,
    deleteRoute,
  } = gridState[gridType];
  const gridStore = useSelector((state: StoreType) => state.gridSlice);
  const { redirectTo } = useAppSlice();
  const dispatch = useDispatch();
  const [isOverflow, setIsOverflow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    console.log("ARSEN - item -> ", item);
    if (editPostRoute) {
      const { id, ...form } = item;

      dispatch(
        setActionState({ id, action: Enum.GridActionStateEnum.EDIT, form })
      );
    } else if (editRoute) {
      redirectTo(editRoute.pathWithSearch(item.id));
    }
  };

  const onClickDelete = async (id: number) => {
    if (deleteRoute) {
      let delData: any = { [primaryKey]: id };
      if (formData && formData.ownerKey) {
        delData = { [primaryKey]: id, [formData.ownerKey]: ownerID };
      }
      console.log("ARSEN - delData -> ", delData);
      const response = await deleteRoute.call(delData);
      if (response.status === Enum.Api.Response.Status.OK) {
        dispatch(
          setActionState({ id, action: Enum.GridActionStateEnum.DELETE })
        );
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
    setIsLoading(true);
    dispatch(setGridData([]));
    (async () => {
      let response;
      setTimeout(async () => {
        if (ownerID) response = await dataRoute.setQuery(ownerID).call();
        else response = await dataRoute.call();
        dispatch(setGridData(response.data));
        setIsLoading(false);
      }, 1500);
    })();
  }, [dataRoute]);

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
          minHeight: `calc(${style.scrollerHeight} - ${height || 0}px)`,
          height: `calc(${style.scrollerHeight} - ${height || 0}px)`,
        }}
        className={`${style.scroller} ${isOverflow && style.scrolling}`}
        ref={refArea}
      >
        {isLoading && <Spinner className={style.loader} />}
        {!!formData && (
          <RowAdder
            onSave={(addData: any) => dispatch(addToGridData(addData))}
            rowStyle={`${style.row} ${style.adder}`}
            formData={formData}
            primaryKey={primaryKey}
            ownerId={ownerID}
          />
        )}
        <div className={style.table} ref={refTable}>
          {gridStore.tableData &&
            gridStore.tableData.length > 0 &&
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
                        <RowEditor id={l.id} editPostUrl={editPostRoute} />
                      )}
                  </Fragment>
                );
              })}
          {(!gridStore.tableData || !gridStore.tableData.length) &&
            !isLoading && (
              <div className={style.noData}>There is nothing to display!</div>
            )}
        </div>
      </div>
    </>
  );
};
export default DataGrid;
