"use client";

import { DataGrid, Toolbar } from "@/components";
import Enum from "@enums";
export default function Words() {
  return (
    <div>
      <Toolbar title="All Words" />
      <DataGrid gridType={Enum.GridStateEnum.WORDS} />
    </div>
  );
}
