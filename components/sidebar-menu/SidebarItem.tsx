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
    <div className="flex h-full items-center pl-5 pr-5 pt-5">
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "w-full rounded-2xl pl-5 text-sm font-[500] text-zinc-500 transition-all hover:bg-teal-600/20 hover:text-zinc-600 dark:text-zinc-400 dark:hover:bg-teal-400/10 dark:hover:text-zinc-300 ",
          isActive &&
            " bg-teal-700/80 text-zinc-100 hover:bg-teal-700/90 hover:text-zinc-200 dark:bg-teal-600/30 dark:text-zinc-100 dark:hover:bg-teal-500/30 dark:hover:text-zinc-300",
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "text-zinc-500 dark:text-zinc-400",
              isActive && "text-zinc-100 dark:text-zinc-100",
            )}
          />
          {label}
        </div>
      </button>
    </div>
  );
};
