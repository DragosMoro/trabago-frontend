"use client";

import { ColumnWithCards, Column, Card } from "@/lib/types";
import { useEffect, useState } from "react";
import ColumnItem from "./column-item";
import axios from "axios";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ScrollArea } from "../ui/scroll-area";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ColumnContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [columnsWithCards, setColumnsWithCards] = useState<ColumnWithCards[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const columnsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobColumn/getAll`,
        );
        setColumns(columnsResponse.data);
        console.log(columnsResponse.data);
        const cardsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/getAll`,
        );
        setCards(cardsResponse.data);
        console.log(cardsResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const combinedData = columns.map((column) => ({
      ...column,
      cards: cards.filter((card) => card.jobColumn.id === column.id),
    }));

    // Sortare după order
    combinedData.sort((a, b) => a.order - b.order);

    setColumnsWithCards(combinedData);
  }, [columns, cards]);

  const updateColumnOrder = async (items: Column[]) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/jobColumn/updateOrder`,
        items,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCardOrder = async (items: Card[]) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs/updateOrder`,
        items,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    console.log(result);
    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(
        columnsWithCards,
        source.index,
        destination.index,
      ).map((item, index) => ({ ...item, order: index }));

      setColumnsWithCards(items);
      const mapColumn = items.map((column: Column, index) => ({
        ...column,
        order: index,
      }));
      updateColumnOrder(mapColumn);
    }

    if (type === "card") {
      let newOrderedData = [...columnsWithCards];

      const sourceColumn = newOrderedData.find(
        (column) => column.id === source.droppableId,
      );
      const destColumn = newOrderedData.find(
        (column) => column.id === destination.droppableId,
      );

      if (!sourceColumn || !destColumn) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceColumn.cards) {
        sourceColumn.cards = [];
      }

      // Check if cards exists on the destList
      if (!destColumn.cards) {
        destColumn.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceColumn.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceColumn.cards = reorderedCards;

        setColumnsWithCards(newOrderedData);
        updateCardOrder(reorderedCards);
        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceColumn.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.jobColumn.id = destination.droppableId;

        // Add card to the destination list
        destColumn.cards.splice(destination.index, 0, movedCard);

        sourceColumn.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setColumnsWithCards(newOrderedData);
        updateCardOrder(destColumn.cards);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-3 ml-10 mt-8"
          >
            {columnsWithCards.map((column, i) => (
              <ColumnItem key={column.id} index={i} data={column} />
            ))}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnContainer;
