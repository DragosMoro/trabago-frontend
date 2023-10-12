import AddColumn from "@/components/kanban/AddColumn";
import ColumnContainer from "@/components/kanban/ColumnContainer";

export default function Home() {
    return (
        <div className="flex">
            <ColumnContainer/>
            <AddColumn/>
        </div>
    )
}
