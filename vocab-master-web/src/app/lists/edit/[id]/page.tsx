"use client";

import { TextField, Box } from "@mui/material";
import { DataGrid, Toolbar } from "@/components";
import { GridStateEnum } from "@/config/enums";
import api from "@/service/clientService";
import { useEffect, useState } from "react";
import { ListFormType } from "@/types";
import style from "./page.module.scss";
export default function Page({ params }: { params: { id: number } }) {
  const [formData, setFormData] = useState<ListFormType>({
    id: 0,
    title: "",
    description: "",
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.list.getListDetails.call(params.id);
      const { id, ...form } = data;
      setFormData(form);
    })();
  }, []);

  return (
    <div>
      <form>
        <Box
          sx={{
            p: 2,
            borderRadius: 4,
            border: "1px solid gray",
            marginBottom: 2,
          }}
        >
          <div className={style.form}>
            <div className={style.formSection}>
              <TextField
                variant="outlined"
                label="Name"
                value={formData.title}
              ></TextField>
            </div>
            <div className={style.formSection}>
              <TextField
                variant="outlined"
                label="Description"
                value={formData.description}
              ></TextField>
            </div>
          </div>
        </Box>
      </form>
      <Box sx={{ p: 2, borderRadius: 4, border: "1px solid gray" }}>
        <Toolbar title="Words In The List" />
        <DataGrid gridType={GridStateEnum.LIST_DETAIL} ownerID={params.id} />
      </Box>
    </div>
  );
}
