import Image from "next/image";

import { SidebarRoutes } from "./sidebar-routes";
import { ModeToggle } from "../ui/mode-toggle";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white dark:bg-zinc-950">
      <div className="ml-auto mr-auto flex gap-2 pb-10 pt-6">
        <Image height={40} width={40} alt="logo" src="/logo.png" />
        <span className="flex text-xl font-bold text-black dark:text-white">
          TrabaGo
        </span>
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
