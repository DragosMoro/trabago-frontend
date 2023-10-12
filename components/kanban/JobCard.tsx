import { LucideIcon } from "lucide-react";

interface JobCardProps {
  icon: LucideIcon;
  companyName: string;
  jobTitle: string;
  location: string;
  date: string;
}

const JobCard = ({
  icon: Icon,
  companyName,
  jobTitle,
  location,
  date,
}: JobCardProps) => {
  return (
    <div className="rounded-xl bg-white dark:bg-black/30">
      <div className="flex items-center pt-2 pl-5">
        <div className="h-4 w-4">
          <Icon className="h-full w-full text-zinc-900 dark:text-zinc-300" />
        </div>
        <div className="ml-3 text-lg font-semibold text-zinc-900  dark:text-zinc-300">
          {companyName}
        </div>
      </div>
      <div className="px-5 py-1">
        <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{jobTitle}</div>
        <div className="flex items-center justify-between pt-3 pb-2">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300" >{location}</div>
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
