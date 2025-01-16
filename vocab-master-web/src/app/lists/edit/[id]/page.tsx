"use client";

import { TextField, Box, Button, Alert, Snackbar } from "@mui/material";
import { Save } from "@mui/icons-material";
import { DataGrid, Toolbar } from "@/components";
import { GridStateEnum } from "@/config/enums";
import api from "@/service/clientService";
import { FormEvent, useEffect, useState } from "react";
import { ListFormType } from "@/types";
import { useGridHeight } from "@hooks";
import style from "./page.module.scss";
export default function Page({ params }: { params: { id: number } }) {
  const [elRef, height] = useGridHeight();
  const [formData, setFormData] = useState<ListFormType>({
    id: 0,
    title: "",
    description: "",
  });
  const [snackState, setSnackState] = useState<boolean>(false);

  const onSaveClick = async (e: FormEvent) => {
    e.preventDefault();
    const response = await api.list.updateListDetails(formData);

    if (response?.data == "OK") {
      setSnackState(true);
    }
  };
  useEffect(() => {
    (async () => {
      const { data } = await api.list.getListDetails(params.id);

      setFormData(data);
    })();
  }, []);

  return (
    <div>
      <form className={style.form} ref={elRef} onSubmit={(e) => onSaveClick(e)}>
        <div className={style.formSection}>
          <TextField
            variant="outlined"
            label="Name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            fullWidth
          ></TextField>
        </div>
        <div className={style.formSection}>
          <TextField
            variant="outlined"
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
          ></TextField>
        </div>
        <Button
          sx={{ alignSelf: "normal" }}
          variant="contained"
          color="success"
          type="submit"
          startIcon={<Save />}
        >
          Save
        </Button>
      </form>
      <Box sx={{ p: 2, borderRadius: 4, border: "1px solid gray" }}>
        <Toolbar title="Words In The List" />
        <DataGrid
          gridType={GridStateEnum.LIST_DETAIL}
          ownerID={params.id}
          height={height}
        />
      </Box>
      <Snackbar
        open={snackState}
        autoHideDuration={6000}
        onClose={() => setSnackState(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Vocabulary list has been updated!
        </Alert>
      </Snackbar>
    </div>
  );
}
