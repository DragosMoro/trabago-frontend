"use client";
import Image from "next/image";

import { SidebarRoutes } from "./sidebar-routes";
import { ModeToggle } from "../ui/mode-toggle";
import { useAuth } from "../providers/auth-provider";
import { UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const Auth = useAuth();
  const user = Auth?.getUser();
  if (!user) {
    router.push("/signin");
    throw new Error("User is not authenticated");
  }
  console.log(user);

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r justify-between bg-white dark:bg-zinc-950">
      <div className="flex flex-col">
        <div className="ml-7 flex gap-2 pb-10 pt-6">
          <Image height={40} width={40} alt="logo" src="/logo.png" />
          <span className="flex text-xl font-bold text-black dark:text-white">
            TrabaGo
          </span>
        </div>
        <SidebarRoutes />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="m-auto flex h-[50px] w-[200px] items-center justify-center gap-2 rounded-lg border">
          <UserCircle2 className="h-6 w-6 " />
          <span>
            {user?.data.name.length > 20
              ? user?.data.name.split(" ")[0]
              : user?.data.name}
          </span>
        </div>
        <div className="ml-auto mr-auto pb-5 ">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
