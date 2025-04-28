import { createSlice } from "@reduxjs/toolkit";
import { GridSliceType } from "@/types";

const initialState: GridSliceType = {
  search: "",
  tableData: [],
  actionState: {},
  formState: {},
};
export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setActionState: (state, { payload }) => {
      if (payload.action) {
        if (payload.form) {
          state.actionState[payload.id] = {
            action: payload.action,
            form: payload.form,
          };
        } else {
          if (state.actionState[payload.id]) {
            state.actionState[payload.id].action = payload.action;
          } else {
            state.actionState[payload.id] = { action: payload.action };
          }
        }
      } else if (payload.formKey) {
        state.actionState[payload.id].form[payload.formKey] = payload.value;
      } else {
        console.log("buraya geldi mi");
        state.actionState[payload.id] = undefined;
      }
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
    updateGridRow: (state, { payload }) => {
      console.log("payload", payload);
      let itemIndex = state.tableData.findIndex((i) => i.id === payload.id);
      state.tableData[itemIndex] = payload;
    },
    deleteRow: (state, { payload }) => {
      let itemIndex = state.tableData.findIndex((i) => i.id === payload);
      state.tableData.splice(itemIndex, 1);
    },
  },
});

export const {
  setSearch,
  setGridData,
  addToGridData,
  deleteRow,
  updateGridRow,
  setActionState,
} = gridSlice.actions;
export default gridSlice.reducer;
