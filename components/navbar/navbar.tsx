"use client";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { useCardModal } from "@/hooks/use-modal-store";
import { useSearch } from "../providers/search-provider";
import { Input } from "../ui/input";

const Navbar = () => {
  const { setSearchValue } = useSearch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const { onOpen } = useCardModal();

  return (
    <div className="fixed mb-2 h-[70px] w-[calc(100%-240px)] border-b bg-white dark:bg-zinc-950">
      <div className="flex h-full items-center justify-between px-5">
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-300">
          Job Board
        </span>
        <div className="flex items-center gap-5">
          <Input
            className="max-h-[35px] max-w-[300px] transition-all focus:border focus:border-zinc-700 dark:focus:border-zinc-400"
            placeholder="Search for a job"
            onChange={handleSearchChange}
          />
          <Button
            className="max-h-[35px] max-w-[150px] border bg-[#0b70a9] text-zinc-100 transition-all hover:bg-[#0b70a9]/90 lg:w-[150px]"
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
