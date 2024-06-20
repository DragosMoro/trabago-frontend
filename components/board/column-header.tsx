"use client";

import { Column } from "@/lib/types";

import ColumnOptions from "./column-options";
interface ColumnHeaderProps {
  data: Column;
}

const ColumnHeader = ({ data }: ColumnHeaderProps) => {
  return (
    <div className="mx-2 mt-2 flex w-[300px] items-center justify-between gap-2 gap-x-2 text-sm font-semibold">
      <div className="flex items-center justify-start gap-3">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: data.color }}
        ></div>
        <span className="text-lg font-semibold">{data.name}</span>
      </div>

      <div className="flex justify-between">
        <ColumnOptions data={data} />
      </div>
    </div>
  );
};

export default ColumnHeader;
