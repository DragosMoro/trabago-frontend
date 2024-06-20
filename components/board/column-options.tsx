import { useRef, ElementRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { MoreVertical, X } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Column } from "@/lib/types";
import { Separator } from "../ui/separator";
import { useCardModal } from "@/hooks/use-modal-store";

interface ColumnOptionsProps {
  data: Column;
}

const ColumnOptions = ({ data }: ColumnOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { onOpen } = useCardModal();
  const { name, id } = data;
  const columnForAdd = { id, name };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-[240px] px-0 pb-3 pt-3"
        side="bottom"
        align="start"
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-800 dark:text-neutral-400">
          Column Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-400"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={() => onOpen("editColumn", { column: data })}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          Edit Column
        </Button>
        <Button
          onClick={() => onOpen("deleteColumn", { column: data })}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          Delete Column
        </Button>
        <Separator />
        <Button
          onClick={() => onOpen("addJob", { columnFormat: columnForAdd })}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          Add Job
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnOptions;
