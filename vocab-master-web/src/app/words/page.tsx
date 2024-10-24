"use client";

import { GridStateEnum } from "@/config/enums";
import { DataGrid, Toolbar } from "@/components";

export default function Words() {
  return (
    <div>
      <Toolbar title="All Words" />
      <DataGrid gridType={GridStateEnum.WORDS} />
    </div>
  );
}
