import style from "./RowEditor.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { GridActionStateEnum } from "@/config/enums";
import { updateGridRow, setActionState } from "@/store/slices/gridSlice";
import { Save, Cancel, SubdirectoryArrowRight } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import axios from "axios";
import { ApiUrl, StoreType } from "@/types";

type RowEditorProps = {
  [key: number]: number;
  id: number;
  editPostUrl?: string;
};
const RowEditor = ({ id, editPostUrl }: RowEditorProps) => {
  const dispatch = useDispatch();
  const actionState = useSelector(
    (state: StoreType) => state.gridSlice.actionState
  );
  const onClickCancel = (id: number) => {
    dispatch(setActionState({ id, action: GridActionStateEnum.CANCEL }));
  };
  const onClickSave = async (id: number) => {
    if (editPostUrl) {
      const postData = {
        id,
        ...(actionState[id] && actionState[id].form),
      };
      const response = await axios.post(editPostUrl, postData);
      if (response?.data == "OK") {
        dispatch(updateGridRow(postData));
        dispatch(setActionState({ id, action: GridActionStateEnum.SAVE }));
      }
    }
  };

  return (
    <div
      className={` ${style.editor} ${
        actionState[id] &&
        actionState[id].action !== GridActionStateEnum.EDIT &&
        style[`${actionState[id].action}`]
      }`}
    >
      <div>
        <SubdirectoryArrowRight color="primary" />
      </div>
      {Object.entries(actionState[id].form).map(([key, value]) => (
        <div key={`${id}_${key}`}>
          <TextField
            fullWidth
            placeholder={key}
            value={value}
            onChange={(e) =>
              dispatch(
                setActionState({ id, value: e.target.value, formKey: key })
              )
            }
          />
        </div>
      ))}

      <div>
        <IconButton onClick={() => onClickSave(id)}>
          <Save color="success" />
        </IconButton>
        <IconButton onClick={() => onClickCancel(id)}>
          <Cancel color="error" />
        </IconButton>
      </div>
    </div>
  );
};

export default RowEditor;
