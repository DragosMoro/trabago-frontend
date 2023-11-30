
import CardAdd from "@/components/board/card-add";
import CardItem from "@/components/board/card-item";
import ColumnContainer from "@/components/board/column-container";
import ColumnHeader from "@/components/board/column-header";
import ColumnItem from "@/components/board/column-item";
import Navbar from "@/components/navbar/navbar";
import dummyColumn, { cards } from "@/lib/dummy-data";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="">
        <ColumnContainer/>
      </div>
    </div>
  );
}
