import Image from "next/image";

import { SidebarRoutes } from "./sidebar-routes";
import { ModeToggle } from "../ui/mode-toggle";
import SidebarUser from "./sidebar-user";

const Sidebar = () => {

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r justify-between bg-white dark:bg-zinc-950">
      <div className="flex flex-col">
        <div className="ml-7 flex gap-2 pb-10 pt-6 ">
          <Image height={40} width={40} alt="logo" src="/logo.png" />
          <span className="flex text-xl font-bold text-black dark:text-white">
            TrabaGo
          </span>
        </div>
        <SidebarRoutes />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <SidebarUser/>
        <div className="ml-auto mr-auto pb-5 ">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
