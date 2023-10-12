"use client";

import { useState } from "react";

const AddJobButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  return (
    <button
      type="button"
      className="h-[96px] w-[276px] border-2 border-dashed rounded-xl border-zinc-200 text-zinc-600 dark:text-zinc-200 hover:bg-zinc-400/20 hover:text-zinc-600 dark:border-zinc-300 dark:hover:text-zinc-200"
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
    >
      {!isHovered ? <span className="text-3xl">+</span> : "Add a job"}
    </button>
  );
};

export default AddJobButton;
