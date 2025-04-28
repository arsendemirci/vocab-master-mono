"use client";

import { DataGrid, Toolbar } from "@/components";
import Enum from "@enums";
export default function Lists() {
  return (
    <div>
      <Toolbar title="Vocabulary Lists" />
      <DataGrid gridType={Enum.GridStateEnum.LISTS} />
    </div>
  );
}
