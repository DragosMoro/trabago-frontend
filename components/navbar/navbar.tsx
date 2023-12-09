"use client";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { useCardModal } from "@/hooks/use-modal-store";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { onOpen } = useCardModal();

  return (
    <div className="mb-2 h-[70px] w-full border-b bg-zinc-50 dark:bg-zinc-950">
      <div className="flex h-full items-center justify-between px-5">
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-300">
          Job Board
        </span>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setOpen(true)}
            className="group flex max-h-[35px] items-center justify-between gap-x-5 rounded-md border px-2 py-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-800/50"
          >
            <p className="text-sm font-semibold text-zinc-600 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200">
              Search company...
            </p>
            <Search className="h-4 w-4 text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-200" />
          </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search all companies" />
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              {/* {data.map(({ label, type, data }) => {
            if (!data?.length) {
              return null;
            } */}

              <CommandGroup>
                <CommandItem>something</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
          <Button
            className="max-h-[35px]  max-w-[150px] border bg-zinc-900 text-zinc-100 transition-all hover:bg-zinc-800 lg:w-[150px]"
            onClick={() => onOpen("addJob")}
          >
            Add Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
