
import { SidebarRoutes } from "./sidebar-routes";
import { ModeToggle } from "../ui/mode-toggle";
import SidebarUser from "./sidebar-user";
import SidebarLogo from "./sidebar-logo";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col justify-between overflow-y-auto border-r bg-white dark:bg-zinc-950">
      <div className="flex flex-col">
       <SidebarLogo/>
        <SidebarRoutes />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <SidebarUser />
        <div className="ml-auto mr-auto pb-5 ">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
