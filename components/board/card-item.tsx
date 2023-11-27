"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/lib/types";
import Image from "next/image";

interface CardItemProps {
  data: Card;
  index: number;
  color: string;
}

const CardItem = ({ data, index, color }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <div
      role="button"
      onClick={() => cardModal.onOpen(data.id)}
      className="max-h-[130px] w-[300px] cursor-pointer rounded-[9px]"
      style={{ backgroundColor: color }}
    >
      <div className="ml-[3px] flex h-full w-full flex-col rounded-md bg-zinc-900 px-4 gap-3 py-3">
        <div className=" flex items-center gap-3">
          <Image
            loader={() => data.imageUrl}
            src={data.imageUrl}
            alt="Company Name"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="text-xl font-medium text-zinc-200">{data.companyName}</span>
        </div>
        <span className="text-sm font-medium text-zinc-300">{data.jobTitle}</span>
        <div className="flex justify-between">
          <span className="text-xs font-light text-zinc-300">{data.location}</span>
          <span className="text-xs font-light text-zinc-300">{data.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
