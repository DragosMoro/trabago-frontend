"use client";
import { useCardModal } from "@/hooks/use-modal-store";
const ColumnAdd = () => {
  const { onOpen } = useCardModal();
  return (
    <div
      className="hover:duration-400 duration-400 mr-[20px] flex min-w-[330px] cursor-pointer items-center justify-center rounded-lg border bg-white text-lg font-semibold text-neutral-900 shadow-md transition-all ease-in hover:bg-zinc-100/50 hover:text-zinc-600 dark:border-neutral-900 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200 lg:min-h-[680px] 2xl:min-h-[766px]"
      role="button"
      onClick={() => onOpen("addColumn")}
    >
      Add Column
    </div>
  );
};

export default ColumnAdd;
