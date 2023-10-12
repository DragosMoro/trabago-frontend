"use client";

import { cn } from "@/lib/utils";
import { Divide, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebaItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebaItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };
  return (
    <div className="flex items-center h-full pl-5 pr-5 pt-5">
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "pl-5 w-full rounded-2xl text-zinc-500 dark:text-zinc-400 text-sm font-[500] transition-all hover:bg-teal-600/20 dark:hover:bg-teal-400/10 hover:text-zinc-600 dark:hover:text-zinc-300 ",
          isActive &&
            " dark:text-zinc-100 text-zinc-100 bg-teal-700/80 dark:bg-teal-600/30 dark:hover:bg-teal-500/30 hover:bg-teal-700/90 dark:hover:text-zinc-300 hover:text-zinc-200"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "text-zinc-500 dark:text-zinc-400",
              isActive && "dark:text-zinc-100 text-zinc-100"
            )}
          />
          {label}
        </div>
      </button>
    </div>
  );
};
