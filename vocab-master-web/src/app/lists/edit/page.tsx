"use client";

import { TextField, Box, Button, Alert, Snackbar } from "@mui/material";
import { Save } from "@mui/icons-material";
import { DataGrid, Toolbar } from "@/components";
import { apiRoutes } from "@/lib/router";
import { FormEvent, useEffect, useState } from "react";
import { ListFormType } from "@/types";
import { useGridHeight } from "@hooks";
import { useSearchParams } from "next/navigation";
import style from "./page.module.scss";
import Enum from "@enums";

export default function Page() {
  const [elRef, height] = useGridHeight();
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");
  if (!listId) {
    console.log("[VURDA VISEY YAPMALLI AMA NE?");
  }

  const [formData, setFormData] = useState<ListFormType>({
    id: 1,
    title: "dsfss",
    description: "sdf",
  });
  const [snackState, setSnackState] = useState<boolean>(false);

  const onSaveClick = async (e: FormEvent) => {
    e.preventDefault();
    const response = await apiRoutes.LIST_UPDATE.call(formData);

    if (response.status == Enum.Api.Response.Status.OK) {
      setSnackState(true);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      const { data } = await apiRoutes.LIST_GET_DETAILS.setQuery(listId).call();
      console.log("ARSEN - data -> ", data);
      setFormData(data);
    };
    loadData();
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
          gridType={Enum.GridStateEnum.LIST_DETAIL}
          ownerID={Number(listId)}
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
