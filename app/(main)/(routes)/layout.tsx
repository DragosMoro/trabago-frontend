import MobileSidebar from "@/components/sidebar-menu/mobile-sidebar";
import Sidebar from "@/components/sidebar-menu/sidebar-component";
import React from "react";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="fixed inset-y-0 z-50 hidden h-full w-60 flex-col md:flex">
        <Sidebar />
        <MobileSidebar />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </>
  );
};

export default SidebarLayout;
