"use client";
import { FC, useState } from "react";
import { Save, Add } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { RowAdderProps } from "@types";
import axios from "axios";

const RowAdder: FC<RowAdderProps> = ({
  onSave,
  rowStyle,
  formData,
  ownerId,
}) => {
  const { postUrl, defaultState, inputs, primaryKey, ownerKey } = formData;

  const [inputFields, setInputFields] = useState<any>(defaultState);

  const postData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let prop in inputFields) {
      if (!inputFields[prop]) return;
    }
    if (!postUrl) return;
    const postData = { ...inputFields };
    if (ownerKey && ownerId) {
      postData[ownerKey] = ownerId;
    }
    const res = await axios.post(postUrl, postData);

    const addData = { ...inputFields, [primaryKey]: res.data };
    onSave(addData);
    setInputFields(defaultState);
  };
  return (
    <form key="rowAdd" className={rowStyle} onSubmit={postData}>
      <div>
        <Add />
      </div>
      {inputs.map((col) => (
        <div key={col.key}>
          <TextField
            variant="outlined"
            label={col.header}
            size="small"
            fullWidth
            value={inputFields[col.key]}
            onChange={(e) =>
              setInputFields({ ...inputFields, [col.key]: e.target.value })
            }
          />
        </div>
      ))}

      <div>
        <IconButton type="submit">
          <Save color="success" />
        </IconButton>
      </div>
    </form>
  );
};

export default RowAdder;
