
import CardAdd from "@/components/board/card-add";
import CardItem from "@/components/board/card-item";
import ColumnAdd from "@/components/board/column-add";
import ColumnContainer from "@/components/board/column-container";
import ColumnHeader from "@/components/board/column-header";
import ColumnItem from "@/components/board/column-item";
import Navbar from "@/components/navbar/navbar";
import dummyColumn, { cards } from "@/lib/dummy-data";

export default function Home() {
  return (
    <div className="pt-[70px]">
        <ColumnContainer/>
      </div>
  );
}
