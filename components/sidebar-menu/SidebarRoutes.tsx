"use client";

import { BarChartBig, Briefcase, FileLineChart, KanbanSquare} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";


const routes = [
  {
    icon: KanbanSquare,
    label: "Board",
    href: "/",
  },
  {
    icon: BarChartBig,
    label: "Statistics",
    href: "/statistics",
  },
  {
    icon: FileLineChart,
    label: "Resume Analysis",
    href: "/resume",
  },
  {
    icon: Briefcase,
    label: "Job Searching",
    href: "/jobs",
  },
];


export const SidebarRoutes = () => {
 
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}