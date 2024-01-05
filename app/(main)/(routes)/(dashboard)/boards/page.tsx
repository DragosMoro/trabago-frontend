import ColumnContainer from "@/components/board/column-container";
import Navbar from "@/components/navbar/navbar";
import { SearchProvider } from "@/components/providers/search-provider";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col">
      <SearchProvider>
        <Navbar />
        <ColumnContainer />
      </SearchProvider>
    </div>
  );
}
