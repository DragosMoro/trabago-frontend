import React, { useState } from "react";
import ColumnHeader from "./column-header";
import { ColumnWithCards } from "@/lib/types";
import CardItem from "./card-item";
import CardAdd from "./card-add";
import { cn } from "@/lib/utils";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { getStyle } from "@/lib/dnd-style-function";

interface ColumnItemProps {
  data: ColumnWithCards;
  index: number;
}

const ColumnItem = ({ data, index }: ColumnItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="h-full w-[320px] shrink-0 select-none"
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <div
            className="pb-4 flex w-full flex-col items-center justify-center border border-neutral-900 rounded-md bg-zinc-950 shadow-md"
            {...provided.dragHandleProps}
          >
            <ColumnHeader data={data}  />
            <div className="mx-1 my-4 flex flex-col gap-y-2 px-1 py-0.5">
              <CardAdd />
            </div>
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mx-1 flex flex-col gap-y-2 px-1 py-0.5"
                >
                  {data.cards.map((elem, i) => (
                    <CardItem
                      index={i}
                      key={elem.id}
                      data={elem}
                      color={data.color}
                    />
                  ))}
                </ol>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ColumnItem;
