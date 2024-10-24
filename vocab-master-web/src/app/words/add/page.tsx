"use client";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";

interface InputFieldType {
  [key: string]: string;
  question: string;
  check: string;
}
export default function AddWord() {
  const [inputFields, setInputFields] = useState<InputFieldType[]>([
    { question: "", check: "" },
  ]);
  const handleImputChange = (
    index: number,
    event: ChangeEvent<{ name: string; value: string }>
  ) => {
    console.log("event", event.currentTarget, index);
    let fieldsData: InputFieldType[] = [...inputFields];
    fieldsData[index][event.currentTarget.name] = event.currentTarget.value;
    setInputFields(fieldsData);
  };
  const addFormLine = () => {
    setInputFields((oldArray) => [...oldArray, { question: "", check: "" }]);
  };
  const onSubmit = () => {
    console.log("submit form", inputFields);
  };
  return (
    <div>
      <form action={onSubmit}>
        {inputFields.map((item, index) => {
          return (
            <div>
              <TextField
                onChange={(e) => handleImputChange(index, e)}
                name="question"
                label="Question"
                size="small"
                variant="outlined"
                value={item.question}
              />
              <TextField
                onChange={(e) => handleImputChange(index, e)}
                label="Answer"
                name="check"
                size="small"
                variant="outlined"
                value={item.check}
              />
              {index > 0 && (
                <IconButton>
                  <RemoveCircle sx={{ fontSize: 36, color: "red" }} />
                </IconButton>
              )}
            </div>
          );
        })}

        <div>
          <Button
            variant="contained"
            sx={{ flex: "flex-end" }}
            endIcon={<AddCircle />}
            onClick={addFormLine}
          >
            Add More
          </Button>
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
