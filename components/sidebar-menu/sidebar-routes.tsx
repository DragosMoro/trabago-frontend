"use client";

import { FileLineChart, KanbanSquare, Target } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: KanbanSquare,
    label: "Board",
    href: "/boards",
  },
  {
    icon: Target,
    label: "Targeted Resume",
    href: "/targeted",
  },
  {
    icon: FileLineChart,
    label: "Resume Analysis",
    href: "/resume",
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
