import style from "./RowEditor.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { updateGridRow, setActionState } from "@/store/slices/gridSlice";
import { Save, Cancel, SubdirectoryArrowRight } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { StoreType, RowEditorProps } from "@/types";
import Enum from "@enums";

const RowEditor = ({ id, editPostUrl }: RowEditorProps) => {
  const dispatch = useDispatch();
  const actionState = useSelector(
    (state: StoreType) => state.gridSlice.actionState
  );
  console.log("ARSEN - actionState -> ", actionState);
  const onClickCancel = (id: number) => {
    dispatch(setActionState({ id, action: Enum.GridActionStateEnum.CANCEL }));
  };
  const onClickSave = async (id: number) => {
    if (editPostUrl) {
      const postData = {
        id,
        ...(actionState[id] && actionState[id].form),
      };
      const response = await editPostUrl.call(postData); //axios.post(editPostUrl, postData);
      if (response.status === Enum.Api.Response.Status.OK) {
        dispatch(updateGridRow(postData));
        dispatch(setActionState({ id, action: Enum.GridActionStateEnum.SAVE }));
      }
    }
  };
  console.log("ARSEN - actionState[id].form -> ", actionState[id].form);
  return (
    <div
      className={` ${style.editor} ${
        actionState[id] &&
        actionState[id].action !== Enum.GridActionStateEnum.EDIT &&
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
