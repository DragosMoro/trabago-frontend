import React, { useState } from "react";
import ColumnHeader from "./column-header";
import { ColumnWithCards, ColumnFormatForJobAdd } from "@/lib/types";
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
  const { id, name } = data;
  const columnFormatForJobAdd: ColumnFormatForJobAdd = { id, name };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="h-full w-[320px]"
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <div
            className="flex w-full flex-col items-center justify-center rounded-md border border-neutral-900 bg-zinc-950 pb-4 shadow-md"
            {...provided.dragHandleProps}
          >
            <ColumnHeader data={data} />
            <div
              className={cn(
                "mx-1 mt-4 flex flex-col gap-y-2 px-1 py-0.5",
                data.cards.length > 0 && "mb-4",
              )}
            >
              <CardAdd column={columnFormatForJobAdd}/>
            </div>
            <Droppable droppableId={data.id} type="card">
              {(provided, snapshot) => (
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
                  <div
                    style={{
                      display: snapshot.isDraggingOver ? "block" : "none",
                    }}
                  >
                    {provided.placeholder}
                  </div>
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
