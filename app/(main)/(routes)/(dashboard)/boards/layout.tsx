import Navbar from "@/components/navbar/navbar";
import MobileSidebar from "@/components/sidebar-menu/mobile-sidebar";
import Sidebar from "@/components/sidebar-menu/sidebar";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default BoardLayout;
