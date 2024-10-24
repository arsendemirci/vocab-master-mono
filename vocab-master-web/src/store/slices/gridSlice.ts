import { createSlice } from "@reduxjs/toolkit";
import { GridSliceType } from "@/types";

const initialState: GridSliceType = {
  search: "",
  tableData: [],
};
export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    // setGridState: (state, { payload }) => {
    //   state.columns = payload.columns;
    //   state.dataUrl = payload.dataUrl;
    //   console.log("state", state);
    // },
    setGridData: (state, { payload }) => {
      state.tableData = payload;
    },
    addToGridData: (state, { payload }) => {
      state.tableData.unshift(payload);
    },
    deleteRow: (state, { payload }) => {
      let itemIndex = state.tableData.findIndex((i) => i.id === payload);
      state.tableData.splice(itemIndex, 1);
    },
  },
});

export const { setSearch, setGridData, addToGridData, deleteRow } =
  gridSlice.actions;
export default gridSlice.reducer;
