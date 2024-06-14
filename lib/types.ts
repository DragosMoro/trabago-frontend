import { JobType, WorkMode } from "./enums";

export type Id = string;

export type Column = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  color: string;
};

export type Card = {
  id: string;
  company: string; 
  position: string;
  location: string;
  date: string;
  url: string;
  salary: string;
  jobType: JobType;
  workMode: WorkMode;
  createdAt: string;
  updatedAt: string;
  order: number;
  description: string;
  imageUrl: string;
  jobColumn: Column;
};

export type ColumnWithCards = Column & { cards: Card[] };

export type ColumnFormatForJobAdd={
  id:string;
  name:string;
}

export type Course = {
  courseUrl: string;
  imageUrl: string;
  instructorName: string;
  title: string;
}
