import { Card } from "@/lib/types";
import Image from "next/image";
import { Draggable } from "@hello-pangea/dnd";
import { getStyle } from "@/lib/dnd-style-function";
import { useCardModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface CardItemProps {
  data: Card;
  index: number;
  color: string;
}

const CardItem = ({ data, index, color }: CardItemProps) => {
  const { onOpen } = useCardModal();

  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onOpen("deleteJob", { card: data });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => onOpen("editJob", { card: data })}
          className={`bg-${color} max-h-[130px] w-[297px] cursor-pointer rounded-[9px]`}
          style={{
            ...getStyle(provided.draggableProps.style, snapshot),
            backgroundColor: color,
          }}
        >
          <div className="ml-[3px] flex h-full w-full flex-col gap-3 rounded-md border bg-zinc-100 px-3 py-2 dark:bg-zinc-900">
            <div className="flex justify-between">
              <div className=" flex items-center gap-3">
                {data.imageUrl === "" ? (
                  <Image
                    src="/logo.svg"
                    alt="Company Name"
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                ) : (
                  <Image
                    loader={() => data.imageUrl}
                    src={data.imageUrl}
                    alt="Company Name"
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                )}

                <span className="text-xl font-medium text-zinc-900 dark:text-zinc-200">
                  {data.company}
                </span>
              </div>
              <div
                className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-zinc-200 transition-all ease-in-out duration-200 cursor-pointer dark:hover:bg-zinc-800 dark:text-zinc-200"
                onClick={handleDeleteClick}
              >
                <X className="h-4 w-4" />
              </div>
            </div>

            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-300">
              {data.position}
            </span>
            <div className="flex justify-between">
              <span className="text-xs font-normal text-zinc-800 dark:text-zinc-300">
                {data.location}
              </span>
              <span className="text-xs font-normal text-zinc-900 dark:text-zinc-300">
                {data.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
