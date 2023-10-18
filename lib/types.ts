import { LucideIcon } from "lucide-react";

export type Job = {
  id: Id;
  icon: LucideIcon;
  companyName: string;
  jobTitle: string;
  location: string;
  date: string;
  columnId: Id;
};

export type Column = {
  id: Id;
  name: string;
};
export type Id = string | number;
