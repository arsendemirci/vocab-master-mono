"use client";

import { GridStateEnum } from "@/config/enums";
import { DataGrid, Toolbar } from "@/components";

export default function Lists() {
  return (
    <div>
      <Toolbar title="Vocabulary Lists" />
      <DataGrid gridType={GridStateEnum.LISTS} />
    </div>
  );
}
