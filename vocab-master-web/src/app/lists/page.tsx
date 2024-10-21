"use client";

import { GridStateEnum } from "@/config/enums";
import { DataGrid, Toolbar } from "@/components";

export default function Words() {
  return (
    <div>
      <Toolbar />
      <DataGrid gridType={GridStateEnum.LISTS} />
    </div>
  );
}
