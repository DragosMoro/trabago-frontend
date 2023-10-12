import Image from "next/image";

import { SidebarRoutes } from "./SidebarRoutes";
import { ModeToggle } from "../ui/mode-toggle";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white dark:bg-[#2F3136]">
      <div className="ml-auto mr-auto pb-10 pt-6">
        <Image height={150} width={150} alt="logo" src="/logo.svg" />
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
      <div className="ml-auto mr-auto mt-auto pb-5 ">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
