"use client";
import {
  Briefcase,
  CircleEllipsis,
  LucideIcon,
  Signal,
  Trash,
} from "lucide-react";
import JobCard from "./JobCard";
import { ScrollArea } from "../ui/scroll-area";
import AddJobButton from "./AddJobButton";
import { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Id, Job } from "@/lib/types";

interface ColumnContainerProps {
  deleteColumn: (id: Id) => void;
  jobs: Job[];
  column: Column;
  createJob: (columnId: Id) => void;
  deleteJob: (id: Id) => void;
}

const ColumnContainer = ({
  jobs,
  column,
  deleteColumn,
  createJob,
  deleteJob,
}: ColumnContainerProps) => {
  const JobsIds = useMemo(() => {
    return jobs.map((job) => job.id);
  }, [jobs]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        ml-4
        flex
        h-[800px] w-[300px] min-w-[250px]
        rounded-md
        border-2
        border-zinc-500
        bg-sky-800/30
        opacity-40
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="ml-4 h-[800px] w-[300px] min-w-[250px]"
    >
      <div
        className="h-[50px] rounded-t-xl bg-sky-800 "
        {...attributes}
        {...listeners}
      >
        <div className="flex h-full items-center justify-between px-5">
          <div className="text-xl font-semibold text-white">Column 1</div>
          <CircleEllipsis className="h-6 w-6 text-white " />
          <button
            onClick={() => {
              deleteColumn(column.id);
            }}
            className="
        hover:bg-columnBackgroundColor
        rounded
        stroke-gray-500
        px-1
        py-2
        hover:stroke-white
        "
          >
            <Trash />
          </button>
        </div>
      </div>
      <ScrollArea className="h-[750px] w-full rounded-b-xl bg-sky-800/30 px-3 pb-5 pt-5">
        <SortableContext items={JobsIds}>
          {jobs.map((job, i) => (
            <div key={i} className="pb-5">
              <JobCard key={job.id} job={job} deleteJob={deleteJob} />
            </div>
          ))}
        </SortableContext>
        <div className="">
          <AddJobButton />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ColumnContainer;
