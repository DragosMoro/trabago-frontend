import { Briefcase, CircleEllipsis, LucideIcon, Signal } from "lucide-react";
import JobCard from "./JobCard";
import { ScrollArea } from "../ui/scroll-area";
import AddJobButton from "./AddJobButton";

interface Job {
  icon: LucideIcon;
  companyName: string;
  jobTitle: string;
  location: string;
  date: string;
}

const jobs: Job[] = [
  {
    icon: Briefcase,
    companyName: "Amazon",
    jobTitle: "Software Engineer",
    location: "Cluj-Napoca, Romania",
    date: "13/09/2023",
  },
  {
    icon: Signal,
    companyName: "Google",
    jobTitle: "Data Scientist",
    location: "New York, NY, USA",
    date: "20/09/2023",
  },
  {
    icon: Briefcase,
    companyName: "Microsoft",
    jobTitle: "Product Manager",
    location: "Seattle, WA, USA",
    date: "27/09/2023",
  },
  {
    icon: Briefcase,
    companyName: "Amazon",
    jobTitle: "Software Engineer",
    location: "Cluj-Napoca, Romania",
    date: "13/09/2023",
  },
  {
    icon: Signal,
    companyName: "Google",
    jobTitle: "Data Scientist",
    location: "New York, NY, USA",
    date: "20/09/2023",
  },
  {
    icon: Briefcase,
    companyName: "Microsoft",
    jobTitle: "Product Manager",
    location: "Seattle, WA, USA",
    date: "27/09/2023",
  },
  {
    icon: Briefcase,
    companyName: "Amazon",
    jobTitle: "Software Engineer",
    location: "Cluj-Napoca, Romania",
    date: "13/09/2023",
  },
  {
    icon: Signal,
    companyName: "Google",
    jobTitle: "Data Scientist",
    location: "New York, NY, USA",
    date: "20/09/2023",
  },
  {
    icon: Briefcase,
    companyName: "Microsoft",
    jobTitle: "Product Manager",
    location: "Seattle, WA, USA",
    date: "27/09/2023",
  },
];

const ColumnContainer = () => {
  return (
    <div className="ml-4 h-[800px] w-[300px] min-w-[250px]">
      <div className="h-[50px] rounded-t-xl bg-sky-800 ">
        <div className="flex h-full items-center justify-between px-5">
          <div className="text-xl font-semibold text-white">Column 1</div>
          <CircleEllipsis className="h-6 w-6 text-white " />
        </div>
      </div>
      <ScrollArea className="h-[750px] w-full rounded-b-xl bg-sky-800/30">
        <ScrollArea className="px-3 pb-5 pt-5">
          {jobs.map((job, i) => (
            <div key={i} className="pb-5">
              <JobCard
                icon={job.icon}
                companyName={job.companyName}
                jobTitle={job.jobTitle}
                location={job.location}
                date={job.date}
              />
            </div>
          ))}
          <div className="">
          <AddJobButton/>
        </div>
        </ScrollArea>
        
      </ScrollArea>
    </div>
  );
};

export default ColumnContainer;
