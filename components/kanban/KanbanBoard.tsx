"use client";

import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Briefcase, LucideIcon, Signal } from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import AddJobButton from "./AddJobButton";
import JobCard from "./JobCard";
import { Column, Id, Job } from "@/lib/types";
import AddColumn from "./AddColumn";

const defaultCols: Column[] = [
  {
    id: "1",
    name: "Applied",
  },
  {
    id: "2",
    name: "Altcv",
  },
];

const defaultJobs: Job[] = [
  {
    id: "1",
    icon: Briefcase,
    companyName: "Amazon",
    jobTitle: "Software Engineer",
    location: "Cluj-Napoca, Romania",
    date: "13/09/2023",
    columnId: "1",
  },
  {
    id: "2",
    icon: Signal,
    companyName: "Google",
    jobTitle: "Data Scientist",
    location: "New York, NY, USA",
    date: "20/09/2023",
    columnId: "1",
  },
  {
    id: "3",
    icon: Briefcase,
    companyName: "Microsoft",
    jobTitle: "Product Manager",
    location: "Seattle, WA, USA",
    date: "27/09/2023",
    columnId: "1",
  },
  {
    id: "4",
    icon: Briefcase,
    companyName: "Amazon",
    jobTitle: "Software Engineer",
    location: "Cluj-Napoca, Romania",
    date: "13/09/2023",
    columnId: "1",
  },
  {
    id: "5",
    icon: Signal,
    companyName: "Google",
    jobTitle: "Data Scientist",
    location: "New York, NY, USA",
    date: "20/09/2023",
    columnId: "1",
  },
  {
    id: "6",
    icon: Briefcase,
    companyName: "Microsoft",
    jobTitle: "Product Manager",
    location: "Seattle, WA, USA",
    date: "27/09/2023",
    columnId: "1",
  },
  {
    id: "7",
    icon: Briefcase,
    companyName: "Amazon",
    jobTitle: "Software Engineer",
    location: "Cluj-Napoca, Romania",
    date: "13/09/2023",
    columnId: "1",
  },
  {
    id: "8",
    icon: Signal,
    companyName: "Google",
    jobTitle: "Data Scientist",
    location: "New York, NY, USA",
    date: "20/09/2023",
    columnId: "1",
  },
  {
    id: "9",
    icon: Briefcase,
    companyName: "Microsoft",
    jobTitle: "Product Manager",
    location: "Seattle, WA, USA",
    date: "27/09/2023",
    columnId: "1",
  },
];

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [jobs, setJobs] = useState<Job[]>(defaultJobs);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  return (
    <div
      className="
        flex
        flex-1
        flex-col
        bg-white
        dark:bg-black
        rounded-xl
        shadow-xl
        p-5
        w-full
        max-w-5xl
        mx-auto
        my-10
        dark:border-gray-800
        border-gray-200
        border
  "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex">
          <div className="flex">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  createJob={createJob}
                  deleteJob={deleteJob}
                  jobs={jobs.filter((job) => job.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <AddColumn />
        </div>

        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  createJob={createJob}
                  deleteJob={deleteJob}
                  jobs={jobs.filter((job) => job.columnId === activeColumn.id)}
                />
              )}
              {activeJob && <JobCard job={activeJob} deleteJob={deleteJob} />}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );

  function createJob(columnId: Id) {
    const newJob: Job = {
      id: generateId().toString(),
      icon: Briefcase,
      companyName: "Company",
      jobTitle: "Job Title",
      location: "Location",
      date: "Date",
      columnId: columnId,
    };

    setJobs([...jobs, newJob]);
  }

  function deleteJob(id: Id) {
    const newJob = jobs.filter((job) => job.id !== id);
    setJobs(newJob);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId().toString(),
      name: "New Column",
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newJobs = jobs.filter((job) => job.columnId !== id);
    setJobs(newJobs);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Job") {
      setActiveJob(event.active.data.current.job);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveJob(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAJob = active.data.current?.type === "Job";
    const isOverAJob = over.data.current?.type === "Job";

    if (!isActiveAJob) return;

    // Im dropping a Job over another Job
    if (isActiveAJob && isOverAJob) {
      setJobs((jobs) => {
        const activeIndex = jobs.findIndex((job) => job.id === activeId);
        const overIndex = jobs.findIndex((job) => job.id === overId);

        if (jobs[activeIndex].columnId != jobs[overIndex].columnId) {
          // Fix introduced after video recording
          jobs[activeIndex].columnId = jobs[overIndex].columnId;
          return arrayMove(jobs, activeIndex, overIndex - 1);
        }

        return arrayMove(jobs, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Job over a column
    if (isActiveAJob && isOverAColumn) {
      setJobs((jobs) => {
        const activeIndex = jobs.findIndex((t) => t.id === activeId);

        jobs[activeIndex].columnId = overId;
        console.log("DROPPING Job OVER COLUMN", { activeIndex });
        return arrayMove(jobs, activeIndex, activeIndex);
      });
    }
  }
  function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }
};
