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
      console.log("payload", payload);
      state.tableData = payload;
    },
  },
});

export const { setSearch, setGridData } = gridSlice.actions;
export default gridSlice.reducer;
