"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id, Job } from "@/lib/types";
import { useState } from "react";
import { Trash } from "lucide-react";

interface JobCardProps {
  job: Job;
  deleteJob: (id: Id) => void;
}

const JobCard = ({ job, deleteJob }: JobCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job.id,
    data: {
      type: "Job",
      job,
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
        className="rounded-xl bg-white/20 dark:bg-black/30"
      >
        <div className="flex items-center pl-5 pt-2">
          <div className="h-4 w-4">
            <job.icon className="h-full w-full text-zinc-900 dark:text-zinc-300" />
          </div>
          <div className="ml-3 text-lg font-semibold text-zinc-900  dark:text-zinc-300">
            {job.companyName}
          </div>
        </div>
        <div className="px-5 py-1">
          <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            {job.jobTitle}
          </div>
          <div className="flex items-center justify-between pb-2 pt-3">
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {job.location}
            </div>
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {job.date}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-xl bg-white dark:bg-black/30"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div className="flex items-center pl-5 pt-2">
        <div className="h-4 w-4">
          <job.icon className="h-full w-full text-zinc-900 dark:text-zinc-300" />
        </div>
        <div className="ml-3 text-lg font-semibold text-zinc-900  dark:text-zinc-300">
          {job.companyName}
        </div>
        {mouseIsOver && (
        <button
          onClick={() => {
            deleteJob(job.id);
          }}
          className="ml-auto mr-2 h-4 w-4 text-zinc-900 dark:text-zinc-300"
        >
          <Trash />
        </button>
      )}
      </div>
      <div className="px-5 py-1">
        <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          {job.jobTitle}
        </div>
        <div className="flex items-center justify-between pb-2 pt-3">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {job.location}
          </div>
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {job.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
