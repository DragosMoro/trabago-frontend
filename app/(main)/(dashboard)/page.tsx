"use client"

import CardItem from "@/components/board/card-item";
import ColumnHeader from "@/components/board/column-header";
import Navbar from "@/components/navbar/navbar";
import dummyColumn, { cards } from "@/lib/dummy-data";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      {/* <div className="flex flex-col gap-5 ml-2">
        {cards.map((elem, i) => (
          <CardItem key={i} data={elem} index={i} color="#A60000"/>
        ))}
      </div> */}
      <div className="w-[200px]">

      <ColumnHeader data={dummyColumn} onAddCard={()=>{}} />
      </div>
    </div>
  );
}
