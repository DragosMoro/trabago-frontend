"use client";

import { useAction } from "@/hooks/use-action";
import { Column } from "@/lib/types";
import { useState, useRef, ElementRef } from "react";

import { useEventListener } from "usehooks-ts";
import { FormInput } from "../form/form-input";
import ColumnOptions from "./column-options";
interface ColumnHeaderProps {
  data: Column;
  onAddCard: () => void;
}

const ColumnHeader = ({ data, onAddCard }: ColumnHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  // TO DO
  // handle form submit
  // look into the trello clone code

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="flex items-center justify-between gap-2 gap-x-2 px-2 pt-2 text-sm font-semibold">
      <div className="h-3 w-4 bg-rose-600 rounded-full"></div>
      <div className="flex justify-between">
        {isEditing ? (
          <form ref={formRef} action={() => {}} className="flex-1 px-[2px]">
            <input hidden id="id" name="id" value={data.id} />
            <FormInput
              ref={inputRef}
              onBlur={onBlur}
              id="title"
              placeholder="Enter column title"
              defaultValue={title}
              className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-zinc-900 "
            />
            <button type="submit" hidden />
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
          >
            {title}
          </div>
        )}
        <ColumnOptions onAddCard={onAddCard} data={data} />
      </div>
    </div>
  );
};

export default ColumnHeader;
