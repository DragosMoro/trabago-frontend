import Image from "next/image";

import { SidebarRoutes } from "./SidebarRoutes";
import { ModeToggle } from "../ui/mode-toggle";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-[#2F3136]">
      <div className="ml-auto mr-auto pt-6 pb-10">
        <Image height={150} width={150} alt="logo" src="/logo.png" />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="ml-auto mr-auto mt-auto pb-5 ">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
