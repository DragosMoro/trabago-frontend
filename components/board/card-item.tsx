import { Card } from "@/lib/types";
import Image from "next/image";
import { Draggable } from "@hello-pangea/dnd";
import { getStyle } from "@/lib/dnd-style-function";

interface CardItemProps {
  data: Card;
  index: number;
  color: string;
}

const CardItem = ({ data, index, color }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => {}}
          className={`bg-${color} max-h-[130px] w-[297px] cursor-pointer rounded-[9px]`}
          style={{
            ...getStyle(provided.draggableProps.style, snapshot),
            backgroundColor: color,
          }}
        >
          <div className="ml-[3px] flex h-full w-full flex-col gap-3 rounded-md bg-zinc-900 px-4 py-3">
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

              <span className="text-xl font-medium text-zinc-200">
                {data.company}
              </span>
            </div>
            <span className="text-sm font-medium text-zinc-300">
              {data.position}
            </span>
            <div className="flex justify-between">
              <span className="text-xs font-light text-zinc-300">
                {data.location}
              </span>
              <span className="text-xs font-light text-zinc-300">
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
