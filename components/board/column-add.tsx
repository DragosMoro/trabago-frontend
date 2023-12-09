"use client"
import { useCardModal } from "@/hooks/use-modal-store";
const ColumnAdd = () => {
  const { onOpen } = useCardModal();
  return (
    <div
      className="hover:duration-400 duration-400 flex w-[340px] cursor-pointer items-center justify-center rounded-lg border border-neutral-900 bg-zinc-950 text-lg font-semibold transition-all ease-in dark:text-white dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200 "
      role="button"
      onClick={() => onOpen("addColumn")}
    >
      Add Column
    </div>
  );
};

export default ColumnAdd;
