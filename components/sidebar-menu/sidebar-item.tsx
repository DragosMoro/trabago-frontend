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
          "w-full rounded-xl pl-5 text-sm font-[500] text-zinc-700 transition-all hover:bg-zinc-200/40 hover:text-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800/30 dark:hover:text-white ",
          isActive &&
            " bg-zinc-200/80 text-zinc-800 hover:bg-zinc-300/90 hover:text-zinc-900 dark:bg-zinc-800/30 dark:text-zinc-100 dark:hover:bg-zinc-600/30 dark:hover:text-zinc-200",
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "text-zinc-700 dark:text-zinc-200",
              isActive && "text-zinc-800 dark:text-zinc-100",
            )}
          />
          {label}
        </div>
      </button>
    </div>
  );
};
